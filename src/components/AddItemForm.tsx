import Button from '@mui/material/Button';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type PropsType = {
  onClick: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = ({ onClick }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError('');
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickHandler();

  const onClickHandler = () => {
    if (!inputValue.trim()) {
      setError('Field is required!');
      return;
    }
    onClick(inputValue.trim());
    setInputValue('');
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={inputChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error-input' : ''}
      />
      <Button onClick={onClickHandler} name='add task' />
      {error && <div className='error'>{error}</div>}
    </div>
  );
};
