import React from 'react';
import FieldWrapper from '../FieldWrapperFormik';
import { FormikInputProps } from '.';

const FormikInput: React.FC<FormikInputProps> = ({
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
      id={id}
      label={label}
      required={required}
      description={description}
      formik={{field, form, meta}}
    >
      <input {...field} {...props} id={id} />
    </FieldWrapper>
  );
};

export default FormikInput;
