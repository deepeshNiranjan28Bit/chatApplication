import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import { storage } from '../../../misc/firebase';

const MAX_FILE_SIZE = 1000 * 1024 * 5;

function AttachmentBtnModal({ afterUpload }) {
  const { chatId } = useParams();
  const { isOpen, close, open } = useModalState();

  const [fileList, setFileList] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const onChange = fileArr => {
    const filtered = fileArr
      .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };

  const onUpload = async () => {
    setIsLoad(true);
    try {
      const uploadPromises = fileList.map(f => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, { cacheControl: `public,max-age=${3600 * 24 * 3}` });
      });
      const uploadSnap = await Promise.all(uploadPromises);

      const shapePromises = uploadSnap.map(async snap => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);

      setIsLoad(false);
      close();
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload Your Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            autoUpload={false}
            action=""
            onChange={onChange}
            fileList={fileList}
            multiple
            listType="picture-text"
            className="w-100"
            disabled={isLoad}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block disabled={isLoad} onClick={onUpload}>
            Send to chat
          </Button>
          <div className="align-right mt-2">
            <small>* only files less than 5mb is allowed.</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AttachmentBtnModal;
