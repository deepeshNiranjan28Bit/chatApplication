import React, { useCallback, useState } from 'react';
import { Input, Icon, InputGroup, Alert } from 'rsuite';

function EditableInput({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Your input is empty',
  wrapperClassName = '',
  ...inputProps
}) {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      Alert.info(emptyMsg, 4000);
    }
    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setIsEditable(false);
  };
  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          disabled={!isEditable}
          {...inputProps}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'}></Icon>
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check"></Icon>
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
}

export default EditableInput;
