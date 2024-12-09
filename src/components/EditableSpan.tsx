import { ChangeEvent, FC, useState } from 'react';

type PropsType = {
  title: string;
  callback: (title: string) => void;
};

export const EditableSpan: FC<PropsType> = ({ title, callback }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  const onDoubleClickHandler = () => setEditMode(true);
  const onBlurHandler = () => {
    if (value.trim().length) {
      callbackHandler();
      setEditMode(false);
    } else {
      alert('Field must be required!');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const callbackHandler = () => {
    callback(value);
  };

  return editMode ? (
    <input
      value={value}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{title}</span>
  );
};
