import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type PropsType = {
  onClick: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = ({ onClick }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(false);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickHandler();

  const onClickHandler = () => {
    if (!inputValue.trim()) {
      setError(true);
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
        label={error ? 'Incorrect entry.' : 'Type new title'}
        variant='outlined'
        size='small'
        value={inputValue}
        onChange={inputChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
      />
      <Button variant='contained' onClick={onClickHandler} style={btnStyles}>
        +
      </Button>
    </Box>
  );
};
