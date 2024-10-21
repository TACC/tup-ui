import React from 'react';

import { useProjectScienceField } from '@tacc/tup-hooks';
import { FormikInput, FormikSelect } from '@tacc/core-components';
import { LoadingSpinner } from '@tacc/core-components';

import styles from './ProjectGrantForm.module.css';
import { Field } from 'formik';

const ProjectGrantFormFields: React.FC = () => {
  const scienceFields = useProjectScienceField().data ?? [];
  if (!scienceFields.length) return <LoadingSpinner />;
  return (
    <>
      <div className={styles['title-row']}>
        <Field component={FormikInput} name="title" label="Title" required />
        <Field
          component={FormikInput}
          name="grantNumber"
          label="Grant Number"
        />
      </div>
      <Field component={FormikInput} name="piName" label="PI Name" required />

      <Field
        component={FormikSelect}
        label="Field of Science"
        name="fieldId"
        required
      >
        {scienceFields.map((field) => (
          <option key={field.id} value={field.id}>
            {[...new Array(field.depth)].map((_) => '--- ')}
            {field.id === 1 ? 'Select Field of Science' : field.name}
          </option>
        ))}
      </Field>
      <Field
        component={FormikInput}
        name="fundingAgency"
        label="Funding Agency"
      />

      <Field component={FormikInput} name="awardNumber" label="Award Number" />
      <Field
        component={FormikInput}
        name="awardAmount"
        label="Award Amount"
        description="Please provide a number value; do not use commas.
                            This information will not be displayed publicly"
      />
      <div className={styles['date-row']}>
        <Field
          component={FormikInput}
          name="start"
          label="Start Date"
          type="date"
        />
        <Field
          component={FormikInput}
          name="end"
          label="End Date"
          type="date"
        />
      </div>
      <Field
        component={FormikInput}
        name="nsfStatusCode"
        label="NSF Status Code"
        description="Typical status codes are: Pending, Recommended,
                            Declined, Awarded, Withdrawn, Returned"
      />
    </>
  );
};

export default ProjectGrantFormFields;
