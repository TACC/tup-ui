import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
export type FieldWrapperProps = {
  name: string;
  label: string;
  required?: boolean;
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
    <div className={`c-form__field ${required ? 'has-required' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required ? <span className="c-form__star">*</span> : null}
      </label>
      <Field name={name} as={Component} id={name} required={required} />
      <ErrorMessage name={name}>
        {(msg) => (
          <ul className="c-form__errors">
            <li>{msg}</li>
          </ul>
        )}
      </ErrorMessage>
      <div className="c-form__help">{description}</div>
    </div>
  );
};

export default FieldWrapper;
