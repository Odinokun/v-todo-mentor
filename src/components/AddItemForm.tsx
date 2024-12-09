import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from './Button';

type PropsType = {
  callback: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = ({ callback }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError('');
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && addTaskHandler();

  const addTaskHandler = () => {
    if (!inputValue.trim()) {
      setError('Field is required!');
      return;
    }
    callback(inputValue.trim());
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
      <Button name='add task' onClick={addTaskHandler} />
      {error && <div className='error'>{error}</div>}
    </div>
  );
};
