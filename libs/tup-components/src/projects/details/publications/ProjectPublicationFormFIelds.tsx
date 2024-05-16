import React from 'react';
import { Field } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { FormikInput } from '@tacc/core-components';
import styles from './ProjectPublicationForm.module.css';

const ProjectPublicationFormFields: React.FC = () => {
  return (
    <>
      <FormikInput name="title" label="Publication Title" required />
      <FormikInput
        name="authors"
        label="Authors"
        required
        description="Separate multiple authors with a comma"
      />
      <div className={styles['form-row']}>
        <FormikInput name="yearPublished" label="Year Published" required />
        <FormikInput name="publisher" label="Publisher" />
        <FormikInput name="venue" label="Venue" />
      </div>
      <FormikInput
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
