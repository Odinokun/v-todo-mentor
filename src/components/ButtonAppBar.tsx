import { FC } from 'react';
import Menu from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const ButtonAppBar: FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Todolists App
        </Typography>
        <Button color='inherit'>Login</Button>
      </Toolbar>
    </AppBar>
  );
};
