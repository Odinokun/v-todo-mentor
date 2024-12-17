import { Typography } from '@mui/material';
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
      callback(value);
      setEditMode(false);
    } else {
      alert('Field must be required!');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  return editMode ? (
    <input value={value} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus />
  ) : (
    <Typography variant='inherit' component='span' onDoubleClick={onDoubleClickHandler}>
      {title}
    </Typography>
  );
};
