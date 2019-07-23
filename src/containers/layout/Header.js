import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LogoImg from '@assets/logo.svg';
import history from '@utils/history';

// @TODO logged-in menu
export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box flex={1}>
          <Box
            component="img"
            display="block"
            src={LogoImg}
            alt="Pizza"
            height={60}
          />
        </Box>
        <Button
          color="inherit"
          onClick={() => {
            history.push('/cart');
          }}
        >
          Check out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
