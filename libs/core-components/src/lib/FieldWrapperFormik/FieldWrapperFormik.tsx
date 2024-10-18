import React from 'react';
import { FieldProps } from 'formik';
import { Badge } from 'reactstrap';

import './FieldWrapperFormik.global.css';

export type FieldWrapperProps = {
  id?: string;
  label: React.ReactNode;
  required?: boolean;
  className?: string;
  description?: React.ReactNode;
  formik: FieldProps;
};

const FieldWrapper: React.FC<React.PropsWithChildren<FieldWrapperProps>> = ({
  id,
  label,
  required,
  description,
  className,
  children,
  formik: { field, form },
}) => {
  return (
    <div
      className={`c-form__field ${required ? 'has-required' : ''} ${className}`}
    >
      <label htmlFor={id || field.name}>
        {label}
        {required && <Badge color="danger">Required</Badge>}
      </label>
      {children}
      {form.touched[field.name] && form.errors[field.name] ? (
        <ul className="c-form__errors">
          {/* https://github.com/jaredpalmer/formik/issues/3683#issuecomment-1752751768 */}
          <li>{String(form.errors[field.name])}</li>
        </ul>
      ) : null}
      {description && <div className="c-form__help">{description}</div>}
    </div>
  );
};

export default FieldWrapper;
