import React from 'react';
import FieldWrapper from '../FieldWrapperFormik';
import { FormikTextareaProps } from '.';

const FormikTextarea: React.FC<FormikTextareaProps> = ({
  id,
  name,
  label,
  required,
  description,
  field,
  form,
  meta,
  ...props
}: FormikTextareaProps) => {
  return (
    <FieldWrapper
      id={id || field.name}
      label={label}
      required={required}
      description={description}
      formik={{ field, form, meta }}
    >
      <textarea {...field} {...props} id={id || field.name} />
    </FieldWrapper>
  );
};

export default FormikTextarea;
