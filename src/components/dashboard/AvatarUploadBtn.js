import React, { useState, useRef } from 'react';
import { Modal, Button, Alert } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { useProfile } from '../../context/profile.context';
import { database, storage } from '../../misc/firebase';

const fileInputTypes = '.jpeg,.jpg,.png';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

const isValidFile = file => acceptedFileTypes.includes(file.type);

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File Process Error'));
      }
    });
  });
};
function AvatarUploadBtn() {
  const { open, close, isOpen } = useModalState();
  const [isLoad, setIsLoad] = useState(false);

  const { profile } = useProfile();

  const [img, setImg] = useState(null);
  const avatarRef = useRef();

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);

        open();
      } else {
        Alert.warning(`Your file type is not an image : ${file.type}`, 4000);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarRef.current.getImageScaledToCanvas();
    setIsLoad(true);
    try {
      const blob = await getBlob(canvas);

      const AvatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await AvatarFileRef.put(blob, {
        cacheControl: `public , max-age${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const avatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');

      avatarRef.set(downloadUrl);
      setIsLoad(false);
      Alert.success('Avatar uploaded.', 4000);
    } catch (error) {
      setIsLoad(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select New Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-item-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoad}
            >
              Upload New Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AvatarUploadBtn;
