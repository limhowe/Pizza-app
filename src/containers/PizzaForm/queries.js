import gql from 'graphql-tag';

export const GET_PIZZA_SIZES_QUERY = gql`
  query {
    pizzaSizes {
      name
      maxToppings
      basePrice
    }
  }
`;

export const GET_PIZZA_SIZE_BY_NAME_QUERY = gql`
  query($name: PizzaSizes) {
    pizzaSizeByName(name: $name) {
      toppings {
        topping {
          ...toppingFragment
        }
        defaultSelected
      }
    }
  }

  fragment toppingFragment on topping {
    name
    price
  }
`;
