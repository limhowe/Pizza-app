import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { Button } from '@components/common';
import history from '@utils/history';
import PizzaList from './PizzaList';
import { AppSelectors } from '@redux/AppRedux';

function PizzaCart(props) {
  const { cartPrice } = props;
  const handleAddNew = () => {
    history.push('/add');
  };

  return (
    <React.Fragment>
      <Button mt={2} onClick={handleAddNew}>
        Select Pizza
      </Button>
      <PizzaList />
      <Box flex={1}>Total: {cartPrice}</Box>
    </React.Fragment>
  );
}

PizzaCart.propTypes = {
  cartPrice: PropTypes.number
};

const mapStatesToProps = state => ({
  cartPrice: AppSelectors.selectCartPrice(state)
});

export default connect(mapStatesToProps)(PizzaCart);
