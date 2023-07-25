import React from 'react';
import { Badge } from 'reactstrap';

export type FieldWrapperProps = {
  name?: string;
  label: React.ReactNode;
  required?: boolean;
  className?: string;
  description?: React.ReactNode;
  error?: React.ReactNode;
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
  <div
    className={`c-form__field ${required ? 'has-required' : ''} ${className}`}
  >
    <label htmlFor={name}>
      {label}
      {required ? (
        <Badge color="danger">Required</Badge>
      ) : null}
    </label>
    {children}
    {error && (
      <ul className="c-form__errors">
        <li>{error}</li>
      </ul>
    )}
    <div className="c-form__help">{description}</div>
  </div>
);

export default FieldWrapper;
