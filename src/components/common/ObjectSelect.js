import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

ObjectSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string
};

export default function ObjectSelect(props) {
  const { options, onChange, value, ...rest } = props;

  function handleChange(event) {
    if (onChange) {
      const selected = options.find(item => item.value === event.target.value);
      onChange(selected);
    }
  }

  return (
    <Select {...rest} value={value} onChange={handleChange}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {options.map(item => (
        <MenuItem key={item.key} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}
