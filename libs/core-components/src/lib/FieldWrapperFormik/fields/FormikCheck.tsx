import React from 'react';
import FieldWrapper from '../FieldWrapperFormik';
import { FormikInputProps } from '.';

const FormikCheck: React.FC<FormikInputProps> = ({
  id,
  name,
  label,
  required,
  description,
  field,
  form,
  meta,
  ...props
}: FormikInputProps) => {
  return (
    <FieldWrapper
      id={id || field.name}
      label={label}
      required={required}
      description={description}
      formik={{ field, form, meta }}
      className="has-type-check"
    >
      <input
        {...field}
        {...props}
        type="checkbox"
        checked={field.value}
        id={id || field.name}
      />
    </FieldWrapper>
  );
};

export default FormikCheck;
