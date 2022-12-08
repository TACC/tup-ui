import React from 'react';
import FieldWrapper from '../FieldWrapperFormik';
import { FieldInputProps } from 'formik';
import { FormikInputProps } from '.';

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  required,
  description,
  ...props
}: FormikInputProps) => (
  <FieldWrapper
    name={name}
    label={label}
    required={required}
    description={description}
    as={(formikProps: FieldInputProps<any>) => (
      <input {...props} {...formikProps} required={required} />
    )}
  />
);

export default React.memo(FormikInput);
