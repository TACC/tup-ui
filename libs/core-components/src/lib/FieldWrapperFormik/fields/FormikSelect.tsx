import React from 'react';
import FieldWrapper from '../FieldWrapperFormik';
import { FormikSelectProps } from '.';

const FormikTextarea: React.FC<FormikSelectProps> = ({
  id,
  name,
  label,
  required,
  description,
  children,
  field,
  form,
  meta,
  ...props
}: FormikSelectProps) => {
  return (
    <FieldWrapper
      id={id || field.name}
      label={label}
      required={required}
      description={description}
      formik={{ field, form, meta }}
    >
      <select {...field} {...props} id={id || field.name}>
        {children}
      </select>
    </FieldWrapper>
  );
};

export default FormikTextarea;
