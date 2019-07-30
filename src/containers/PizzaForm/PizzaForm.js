import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { Formik, Field, Form } from 'formik';
import { InputLabel } from '@material-ui/core';
import { Button } from '@components/common';
import { CheckGroupField, SelectField } from '@components/form';
import validationSchema from './schema';
import { GET_PIZZA_SIZES_QUERY, GET_PIZZA_SIZE_BY_NAME_QUERY } from './queries';
import {
  convertPizaSizesToSelect,
  convertPizzaSizeInfoToList,
  convertFormValueToCartItem
} from '@utils/transform';
import AppActions from '@redux/AppRedux';
import history from '@utils/history';

class PizzaForm extends React.Component {
  static propTypes = {
    addToCart: PropTypes.func
  };

  handleSubmit = values => {
    const { addToCart } = this.props;
    addToCart(convertFormValueToCartItem(values));
    history.push('/cart');
  };

  renderForm = ({
    isSubmitting,
    isValid,
    values,
    setValues,
    setFieldValue,
    setFieldTouched
  }) => {
    let price = values.basePrice || 0;
    if (values.toppings && Array.isArray(values.toppings)) {
      price += values.toppings.reduce((acc, item) => acc + item.price, 0);
    }

    return (
      <Form>
        <Box
          display="flex"
          flexDirection="column"
          alignSelf="center"
          justifySelf="center"
        >
          <Field
            component={SelectField}
            name="pizzaSize"
            onChange={selectedPizzaSize => {
              const {
                basePrice,
                maxToppings,
                value: pizzaSize
              } = selectedPizzaSize || {
                basePrice: 0,
                maxToppings: 0,
                value: ''
              };
              setValues({
                basePrice,
                maxToppings,
                pizzaSize,
                toppings: []
              });
              setFieldTouched('toppings', false);
            }}
            query={GET_PIZZA_SIZES_QUERY}
            transformer={convertPizaSizesToSelect}
            dataProp="pizzaSizes"
          />
          {values.pizzaSize && (
            <Field
              component={CheckGroupField}
              name="toppings"
              query={GET_PIZZA_SIZE_BY_NAME_QUERY}
              variables={{
                name: values.pizzaSize
              }}
              onChange={toppings => {
                if (
                  values.maxToppings &&
                  values.maxToppings >= toppings.length
                ) {
                  setFieldValue('toppings', toppings);
                }
                setFieldTouched('toppings', true);
              }}
              onBlur={() => {
                setFieldTouched('toppings', true);
              }}
              transformer={convertPizzaSizeInfoToList}
              dataProp="pizzaSizeByName"
            />
          )}
          {values.pizzaSize && <InputLabel>{price}</InputLabel>}
          <Button
            mt={2}
            type="submit"
            loading={isSubmitting}
            disabled={!isValid}
          >
            Add to cart
          </Button>
        </Box>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{ pizzaSize: '', basePrice: 0, toppings: [] }}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema}
        render={this.renderForm}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(AppActions.addToCart(item))
});

export default connect(
  undefined,
  mapDispatchToProps
)(PizzaForm);
