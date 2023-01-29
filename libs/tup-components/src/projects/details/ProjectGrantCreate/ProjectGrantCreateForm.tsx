import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { usePublicationCreate } from '@tacc/tup-hooks';
import { FormikInput } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import styles from './ProjectGrantCreateModal';
import { GrantCreateFormValues } from '../'

const formShape = {
    title: Yup.string().required('Required'),
    grantNumber: Yup.number(),
    piName: Yup.string().required('required'),
    field: Yup.string().required('required'),
    fundingAgency: Yup.string(),
    awardNumber: Yup.string(),
    awardAmount: Yup.string(),
    grantStart: Yup.date(),
    grantEnd: Yup.date(),
    statusCode: Yup.string()
    };

const formSchema = Yup.object().shape(formShape);

export const ProjectGrantCreateForm: React.FC<{ 
    projectId: number }> 
    = ({ projectId }) => {

    const defaultValues = useMemo<GrantCreateFormValues>(
        () => ({
            id: 0,
            title: '',
            grantNumber: NaN,
            piName: '',
            field: '',
            fundingAgency: '',
            awardNumber: NaN,
            awardAmount: NaN,
            start: '',
            end: '', 
            nsfStatusCode: '',
            fieldId: NaN, 
        }),
        []
    );

  const { mutate, isLoading, isSuccess, isError, data } = usePublicationCreate(projectId);

  const onSubmit = (
    values: GrantCreateFormValues,
    { resetForm }: FormikHelpers<GrantCreateFormValues>
  ) => {
    const formData = new FormData();
    formData.set('id', values['id'].toString());
    formData.set('title', values['title']);
    formData.set('grantNumber', values['grantNumber'].toString());
    formData.set('piName', values['piName']);
    formData.set('field', values['field']);
    formData.set('fundingAgency', values['fundingAgency']);
    formData.set('awardNumber', values['awardNumber'].toString());
    formData.set('awardAmount', values['awardAmount'].toString());
    formData.set('start', values['start']);
    formData.set('end', values['end']);
    formData.set('nsfStatusCode', values['nsfStatusCode']);
    formData.set('fieldId', values['fieldId'].toString()); 

    mutate(formData, {
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
        <Form >
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
                  The grant was created.
                </SectionMessage>
              )}
              {isError && (
                <SectionMessage type="warning">
                  There was an error creating your grant.
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
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};
