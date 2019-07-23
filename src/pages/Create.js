import React from 'react';
import Page from '@containers/layout/Page';
import PizzaForm from '@containers/PizzaForm';

export default function CreatePage() {
  return (
    <Page title="Create">
      <PizzaForm />
    </Page>
  );
}
