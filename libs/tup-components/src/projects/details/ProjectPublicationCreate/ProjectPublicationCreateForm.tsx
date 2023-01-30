import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { usePublications, usePublicationCreate } from '@tacc/tup-hooks';
import { FormikInput, FormikCheck } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import styles from './ProjectPublicationCreateModal';
import { PublicationCreateFormValues } from '../'
import { isEmpty } from 'lodash';

const formShape = {
  title: Yup.string().required('Required'),
  authors: Yup.string().required('Required'),
  yearPublished: Yup.number(),
  publisher: Yup.string(),
  url: Yup.string(),
  venue: Yup.string(),
  userCitedTacc: Yup.boolean(),
};

const formSchema = Yup.object().shape(formShape);

export const ProjectPublicationCreateForm: React.FC<{ 
    projectId: number }> 
    = ({ projectId }) => {

  const defaultValues = useMemo<PublicationCreateFormValues>(
    () => ({
      title: '',
      authors: '',
      yearPublished: '',
      publisher: '',
      url: '',
      venue: '',
      userCitedTacc: false,
    }),
    []
  );

  const { mutate, isLoading, isSuccess, isError, data } = usePublicationCreate(projectId);

  const onSubmit = (
    values: PublicationCreateFormValues,
    { resetForm }: FormikHelpers<PublicationCreateFormValues>
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
        <Form >
          <FormikInput name="title" label="Publication Title" required  />
          <FormikInput name="authors" label="Authors" required description="Separate multiple authors with a comma" />
          <FormikInput name="yearPublished" label="Year Published" />
          <FormikInput name="publisher" label="Publisher" />
          <FormikInput name="venue" label="Venue" />
          <FormikInput name="url" label="DOI or URL" description="Provide a URL for the publication or a DOI, if available"/>
          <FormikCheck type="checkbox" name="userCitedTacc" 
                 label="This publication cited TACC or TACC Resources" 
                 description="Please check this box if you cited TACC or TACC resources in this publication"/>


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
                  The publication was updated.
                </SectionMessage>
              )}
              {isError && (
                <SectionMessage type="warning">
                  There was an error updating your publication.
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
