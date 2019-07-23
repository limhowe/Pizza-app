import React from 'react';
import Page from '@containers/layout/Page';
import PizzaCart from '@containers/PizzaCart';

export default function CartPage() {
  return (
    <Page title="Cart">
      <PizzaCart />
    </Page>
  );
}
