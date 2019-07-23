import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Header from '@containers/layout/Header';
import Notifier from '@containers/layout/Notifier';
import Cart from '@pages/Cart';
import Create from '@pages/Create';

const MainContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <MainContainer>
      <Header />
      <Switch>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/add" component={Create} />
        <Route render={() => <Redirect to="/Cart" />} />
      </Switch>
      <Notifier />
    </MainContainer>
  );
}

export default App;
