import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';

import AppActions, { AppSelectors } from '@redux/AppRedux';

function PizzaList(props) {
  const { cartItems, removeFromList } = props;

  if (!cartItems) {
    return null;
  }

  return (
    <List>
      {cartItems.map(item => (
        <ListItem key={item.id}>
          <ListItemText primary={item.pizzaSize} secondary={item.toppings} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="Delete"
              onClick={() => {
                removeFromList(item.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

PizzaList.propTypes = {
  cartItems: PropTypes.array,
  removeFromList: PropTypes.func
};

const mapStatesToProps = state => ({
  cartItems: AppSelectors.selectCartItems(state)
});

const mapDispatchToProps = dispatch => ({
  removeFromList: itemId => dispatch(AppActions.removeFromCart(itemId))
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(PizzaList);
