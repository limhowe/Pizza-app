import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

//TODO: make loader customizable
export default function Loader() {
  return (
    <Box
      width={1}
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}
