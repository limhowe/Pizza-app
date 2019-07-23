import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { Query } from 'react-apollo';
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { Loader, Select } from '@components/common';

SelectField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  query: PropTypes.object,
  transformer: PropTypes.func,
  dataProp: PropTypes.string
};

export default function SelectField(props) {
  const {
    field,
    form,
    disabled,
    query,
    transformer,
    dataProp,
    ...rest
  } = props;
  const formError = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  return (
    <Query query={query} notifyOnNetworkStatusChange={true}>
      {({ data, loading, error }) => {
        if (error) {
          <FormHelperText>{error.toString()}</FormHelperText>;
        }
        const { [dataProp]: selectInfo } = data;

        if (loading && !selectInfo) {
          return <Loader />;
        }

        const { options } = transformer(selectInfo);

        return (
          <FormControl>
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={name}
              error={!!(touched && formError)}
              disabled={form.isSubmitting || disabled}
              {...field}
              {...rest}
              options={options}
            />
            {touched && formError && (
              <FormHelperText>{formError}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    </Query>
  );
}
