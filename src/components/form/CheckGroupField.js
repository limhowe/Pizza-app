import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { Query } from 'react-apollo';
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { Loader, CheckGroup } from '@components/common';

CheckGroupField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  query: PropTypes.object,
  transformer: PropTypes.func,
  dataProp: PropTypes.string,
  variables: PropTypes.object
};

export default function CheckGroupField(props) {
  const {
    field,
    form,
    disabled,
    query,
    transformer,
    dataProp,
    variables,
    ...rest
  } = props;
  const formError = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  return (
    <Query
      query={query}
      variables={variables}
      notifyOnNetworkStatusChange={true}
    >
      {({ data, loading, error }) => {
        if (error) {
          <FormHelperText>{error.toString()}</FormHelperText>;
        }

        const { [dataProp]: listInfo } = data;

        if (loading && !listInfo) {
          return <Loader />;
        }

        const { defaultOptions, options } = transformer(listInfo);

        // I hate this... but at least it should work
        if (defaultOptions && !touched) {
          form.setFieldValue(field.name, defaultOptions);
          form.setFieldTouched(field.name, true);
          return null;
        }

        return (
          <FormControl>
            <InputLabel>{field.label}</InputLabel>
            <CheckGroup
              error={!!(touched && formError)}
              disabled={form.isSubmitting || disabled}
              {...field}
              {...rest}
              touched={touched}
              defaultOptions={defaultOptions}
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
