import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

CheckGroup.propTypes = {
  options: PropTypes.array,
  defaultOptions: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string
};

export default function CheckGroup(props) {
  const { name, options, onChange, onBlur, value, disabled } = props;

  function handleChange(event) {
    if (onChange) {
      const selectedValue = event.target.value;
      const isFound = value.some(item => item.value === selectedValue);
      if (isFound) {
        onChange(value.filter(item => item.value !== selectedValue));
      } else {
        const obj = options.find(item => item.value === selectedValue);
        onChange(value.concat(obj));
      }
    }
  }

  const values = value.reduce((acc, item) => {
    acc[item.value] = true;
    return acc;
  }, {});

  return (
    <FormGroup
      value={values}
      onChange={handleChange}
      onBlur={onBlur}
      name={name}
    >
      {options.map(item => (
        <FormControlLabel
          key={item.key}
          value={item.value}
          control={
            <Checkbox
              checked={!!values[item.value]}
              disabled={disabled}
              color="primary"
            />
          }
          label={item.label}
          labelPlacement="start"
        />
      ))}
    </FormGroup>
  );
}
