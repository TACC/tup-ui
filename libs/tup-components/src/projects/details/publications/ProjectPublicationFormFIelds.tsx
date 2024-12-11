import React from 'react';
import { Field } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { FormikInput } from '@tacc/core-components';
import styles from './ProjectPublicationForm.module.css';

const ProjectPublicationFormFields: React.FC = () => {
  return (
    <>
      <Field
        component={FormikInput}
        name="title"
        label="Publication Title"
        required
      />
      <Field
        component={FormikInput}
        name="authors"
        label="Authors"
        required
        description="Separate multiple authors with a comma"
      />
      <div className={styles['form-row']}>
        <Field
          component={FormikInput}
          name="yearPublished"
          label="Year Published"
          required
        />
        <Field component={FormikInput} name="publisher" label="Publisher" />
        <Field component={FormikInput} name="venue" label="Venue" />
      </div>
      <Field
        component={FormikInput}
        name="url"
        label="URL"
        description="Provide a URL for the publication"
      />

      <div className={styles['checkbox-wrapper']}>
        <Field name="userCitedTacc" id="userCitedTacc" type="checkbox"></Field>
        <label htmlFor="userCitedTacc">
          This publication cited TACC or TACC resources
        </label>
      </div>
    </>
  );
};

export default ProjectPublicationFormFields;
