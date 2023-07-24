import React from 'react';
import { Badge } from 'reactstrap';

import styles from './FieldWrapper.module.css';

export type FieldWrapperProps = {
  name?: string;
  label: string;
  required?: boolean;
  className?: string;
  description?: React.ReactNode;
  error?: string;
};
const FieldWrapper: React.FC<React.PropsWithChildren<FieldWrapperProps>> = ({
  name,
  label,
  required,
  description,
  children,
  className,
  error,
}) => (
    <div className={`c-form__field ${required ? 'has-required' : ''} ${className}`}>
    <label htmlFor={name} className={styles['label']}>
      {label}
      {required ? (
        <Badge color="danger">
          <span className={styles['required-badge']}>Required</span>
        </Badge>
      ) : null}
    </label>
    {children}
    {error && (
      <ul className="c-form__errors">
        <li className={styles['error-text']}>{error}</li>
      </ul>
    )}
    <div className="c-form__help">
      {description}
    </div>
  </div>
);

export default FieldWrapper;
