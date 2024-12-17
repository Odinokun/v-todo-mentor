import { Box, Button, TextField } from '@mui/material';
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

  const btnStyles = {
    maxWidth: '38px',
    maxHeight: '38px',
    minWidth: '38px',
    minHeight: '38px',
    marginLeft: '5px',
  };

  return (
    <Box>
      <TextField
        label='Outlined'
        variant='outlined'
        size='small'
        value={inputValue}
        onChange={inputChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error-input' : ''}
      />
      <Button variant='contained' onClick={onClickHandler} style={btnStyles}>
        +
      </Button>
      {error && <div className='error'>{error}</div>}
    </Box>
  );
};
