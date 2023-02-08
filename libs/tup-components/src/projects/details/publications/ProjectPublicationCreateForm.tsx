import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { usePublicationCreate, ProjectPublicationBody } from '@tacc/tup-hooks';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import styles from './ProjectPublicationForm.module.css';
import ProjectPublicationFormFields from './ProjectPublicationFormFIelds';

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
  projectId: number;
}> = ({ projectId }) => {
  const defaultValues = useMemo<ProjectPublicationBody>(
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

  const { mutate, isLoading, isSuccess, isError } =
    usePublicationCreate(projectId);

  const onSubmit = (
    values: ProjectPublicationBody,
    { resetForm }: FormikHelpers<ProjectPublicationBody>
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
        <Form className={styles['publication-form']}>
          <ProjectPublicationFormFields />

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
