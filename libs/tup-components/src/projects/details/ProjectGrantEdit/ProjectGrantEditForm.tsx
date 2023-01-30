import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { useGrants, useGrantEdit } from '@tacc/tup-hooks';
import { FormikInput } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import { GrantFormValues } from '../'
import styles from './ProjectGrantEditModal.module.css';

const formShape = {
  title: Yup.string().required('Required'),
  grantNumber: Yup.string(),
  piName: Yup.string().required('required'),
  field: Yup.string().required('required'),
  fundingAgency: Yup.string(),
  awardNumber: Yup.string(),
  awardAmount: Yup.number(),
  grantStart: Yup.date(),
  grantEnd: Yup.date(),
  statusCode: Yup.string()
};

const formSchema = Yup.object().shape(formShape);

export const ProjectGrantEditForm: React.FC<{ 
    projectId: number, grantId: number }> 
    = ({ projectId, grantId }) => {

  const grant = useGrants(projectId);
  const grant_stuff = grant?.data ?? [];
  const grant_data = grant_stuff?.find((e) => e.id === grantId)
  const { id, title, grantNumber, piName, field, fundingAgency, awardNumber, awardAmount, start, end, nsfStatusCode, fieldId } = grant_data ?? {};

  const defaultValues = useMemo<GrantFormValues>(
    () => ({
      id: id ?? 0,
      title: title ?? '',
      grantNumber: grantNumber ?? '',
      piName: piName ?? '',
      field: field ?? '',
      fundingAgency: fundingAgency ?? '',
      awardNumber: awardNumber ?? '',
      awardAmount: awardAmount ?? null,
      start: start ?? '',
      end: end ?? '', 
      nsfStatusCode: nsfStatusCode ?? '',
      fieldId: fieldId ?? NaN, 
    }),
    [id, title, grantNumber, piName, field, fundingAgency, awardNumber, awardAmount, start, end, nsfStatusCode, fieldId]
  );

  const { mutate, isLoading, isSuccess, isError, data } = useGrantEdit(projectId, grantId);

  const onSubmit = (
    values: GrantFormValues,
    { resetForm }: FormikHelpers<GrantFormValues>
  ) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return (
    <Formik
      validateOnMount
      enableReinitialize
      initialValues={defaultValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <Form>
          <FormikInput name="title" label="Title" required  />
          <FormikInput name="grantNumber" label="GrantNumber" />
          <FormikInput name="piName" label="PI Name" required />
          <FormikInput name="field" label="Field of Science" required/>
          <FormikInput name="fundingAgency" label="Funding Agency" />
          <FormikInput name="awardNumber" label="Award Number" />
          <FormikInput name="awardAmount" label="Award Amount" 
                       description="Please provide a number value; do not use commas.
                                    This information will not be displayed publicly" />
          <FormikInput name="start" label="Start" />
          <FormikInput name="end" label="End" />
          <FormikInput name="nsfStatusCode" label="NSF Status Code" 
                       description="Typical status codes are: Pending, Recommended, 
                                    Declined, Awarded, Withdrawn, Returned"/>

          <ModalFooter
            style={{
              marginLeft: '-10px',
              marginRight: '-10px',
              paddingTop: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {isSuccess && (
                <SectionMessage type="success">
                  The grant was updated.
                </SectionMessage>
              )}
              {isError && (
                <SectionMessage type="warning">
                  There was an error updating your grant.
                </SectionMessage>
              )}
            </div>
            <Button 
              attr="submit"
              type="primary"
              isLoading={isLoading}
              disabled={!isValid || isLoading}
            >
              Save
            </Button>
            <Button 
              attr="submit"
              type="secondary"
              isLoading={isLoading}
              disabled={!isValid || isLoading} 
            >
              Delete
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};
