import React from 'react';
import FieldWrapper from '../FieldWrapperFormik';
import { useField } from 'formik';
import { FormikTextareaProps } from '.';

const FormikTextarea: React.FC<FormikTextareaProps & { errorComponent?: React.FC<any> }> = ({
  name,
  label,
  required,
  description,
  errorComponent: ErrorComponent,
  ...props
}) => {
  const [field] = useField(name);
  return (
    <FieldWrapper
      name={name}
      label={label}
      required={required}
      description={description}
      errorComponent={ErrorComponent}
    >
      <textarea {...field} {...props} id={name} />
    </FieldWrapper>
  );
};

export default FormikTextarea;
