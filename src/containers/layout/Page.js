import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

const PageWrapper = styled(Box)`
  min-width: 100%;
`;

export default function Page({ title, children }) {
  return (
    <PageWrapper
      display="flex"
      flexDirection="column"
      alignSelf="center"
      justifySelf="center"
      p={3}
    >
      {title && (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      <Box component={Paper} p={2}>
        {children}
      </Box>
    </PageWrapper>
  );
}
