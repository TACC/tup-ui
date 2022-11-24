import React from 'react';
import { FormGroup, Badge } from 'reactstrap';
import styles from './FieldWrapperFormik.module.css';
import { ErrorMessage, Field, useField } from 'formik';
export type FieldWrapperProps = {
  name: string;
  label: string;
  required: boolean;
  description?: string;
  as: React.ComponentType<any>;
};
const FieldWrapper: React.FC<FieldWrapperProps> = ({
  name,
  label,
  required,
  description,
  as: Component,
}) => {
  const [, meta] = useField(name);
  return (
    <FormGroup>
      <label htmlFor={name}>
        {label}
        {required ? (
          <Badge color="danger" style={{ marginLeft: '10px' }}>
            Required
          </Badge>
        ) : null}
      </label>
      <Field name={name} as={Component} id={name} required={required} />
      <ErrorMessage name={name}>{msg =>
        <div className="some-error-class">{msg}</div>
      }</ErrorMessage>
      <div className={styles['form-field__help']} color="muted">
        {description}
      </div>
    </FormGroup>
  );
};

export default FieldWrapper;
