import React from 'react';
import { ErrorMessage } from 'formik';
import { Badge } from 'reactstrap';
import styles from './FieldWrapperFormik.module.css';
export type FieldWrapperProps = {
  name: string;
  label: string;
  required?: boolean;
  description?: React.ReactNode;
};
const FieldWrapper: React.FC<React.PropsWithChildren<FieldWrapperProps>> = ({
  name,
  label,
  required,
  description,
  children,
}) => {
  return (
    <div className={`c-form__field ${required ? 'has-required' : ''}`}>
      <label htmlFor={name} className={styles['label']}>
        {label}
        {required && (
          <Badge color="danger">
            <span className={styles['required-badge']}>Required</span>
          </Badge>
        )}
      </label>
      {children}
      <ErrorMessage name={name}>
        {(msg) => {
          return (
            <ul className="c-form__errors">
              <li className={styles['error-text']}>{msg}</li>
            </ul>
          );
        }}
      </ErrorMessage>
      <div className="c-form__help">{description}</div>
    </div>
  );
};

export default FieldWrapper;
