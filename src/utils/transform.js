export function convertPizaSizesToSelect(pizzaSizes) {
  return {
    options: pizzaSizes.map(item => {
      const { name, maxToppings } = item;
      const newName = name.toUpperCase();
      return {
        ...item,
        maxToppings: maxToppings || Infinity,
        key: name,
        value: newName,
        label: newName
      };
    })
  };
}

export function convertPizzaSizeInfoToList(pizzaSizeInfo) {
  const { toppings } = pizzaSizeInfo;

  let defaultOptions = [];
  const options = toppings.map(toppingInfo => {
    const { defaultSelected, topping } = toppingInfo;
    const obj = {
      ...topping,
      key: topping.name,
      value: topping.name,
      label: topping.name
    };
    if (defaultSelected) {
      defaultOptions.push(obj);
    }
    return obj;
  });

  return {
    defaultOptions,
    options
  };
}

export function convertFormValueToCartItem(pizzaForm) {
  const { pizzaSize, toppings, basePrice } = pizzaForm;
  let price = basePrice || 0;
  if (toppings && Array.isArray(toppings)) {
    price += toppings.reduce((acc, item) => acc + item.price, 0);
  }

  return {
    pizzaSize,
    toppings: toppings.map(item => item.name).join(','),
    price
  };
}
