import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { useGrantCreate, ProjectGrant } from '@tacc/tup-hooks';
import { FormikInput } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import styles from './ProjectGrantCreateModal';
import ProjectGrantFormFields from './ProjectGrantFormFields';

const formShape = {
  title: Yup.string().required('Required'),
  grantNumber: Yup.string(),
  piName: Yup.string().required('Required'),
  fieldId: Yup.number().moreThan(1, 'Required'),
  fundingAgency: Yup.string(),
  awardNumber: Yup.string(),
  awardAmount: Yup.number(),
  grantStart: Yup.date(),
  grantEnd: Yup.date(),
  statusCode: Yup.string(),
};

const formSchema = Yup.object().shape(formShape);

export const ProjectGrantCreateForm: React.FC<{
  projectId: number;
}> = ({ projectId }) => {
  const defaultValues = useMemo<ProjectGrant>(
    () => ({
      id: 0,
      title: '',
      grantNumber: '',
      piName: '',
      field: '',
      fundingAgency: '',
      awardNumber: '',
      awardAmount: undefined,
      start: '',
      end: '',
      nsfStatusCode: '',
      fieldId: NaN,
    }),
    []
  );

  const { mutate, isLoading, isSuccess, isError } = useGrantCreate(projectId);

  const onSubmit = (
    values: ProjectGrant,
    { resetForm }: FormikHelpers<ProjectGrant>
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
          <ProjectGrantFormFields />

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
