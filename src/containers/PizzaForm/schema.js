import { object, string, number, array, ref } from 'yup';

export default object().shape({
  pizzaSize: string()
    .min(2, 'Please select Pizza Size')
    .required('Please select Pizza Size'),
  maxToppings: number(),
  basePrice: number(),
  toppings: array().max(ref('maxToppings'), 'Maximum toppings are exceeded')
});
