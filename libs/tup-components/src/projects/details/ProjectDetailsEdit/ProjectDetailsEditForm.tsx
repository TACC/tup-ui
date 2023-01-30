import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useProjects, useProjectDetails } from '@tacc/tup-hooks';
import { FormikInput, FormikTextarea } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import { ProjectDetailsFormValues } from '..'
import styles from './ProjectDetailsEditModal';

const formShape = {
  title: Yup.string().required('Required'),
  chargeCode: Yup.string(),
  primaryFieldID: Yup.string().required('Required'),
  secondaryFieldID: Yup.string(),
  abstract: Yup.string().required('Required'),
};

const formSchema = Yup.object().shape(formShape);

export const ProjectDetailsEditForm: React.FC<{ 
    projectId: number }> 
    = ({ projectId }) => {
  const details = useProjects();
  const project_data = details?.data ?? [];
  const projectDetails = project_data.find((desc) => desc.id === projectId);
  const { title, chargeCode, fieldId, secondaryFieldId, description } = projectDetails ?? {};
  const defaultValues = useMemo<ProjectDetailsFormValues>(
    () => ({
      title: title ?? '',
      chargeCode: chargeCode ?? '',
      primaryFieldID: fieldId ?? '',
      secondaryFieldID: secondaryFieldId ?? '',
      abstract: description ?? '',
    }),
    [title, chargeCode, fieldId, secondaryFieldId, description]
  );

  const { mutate, isLoading, isSuccess, isError, data } = useProjectDetails(projectId);

  const onSubmit = (
    values: ProjectDetailsFormValues,
    { resetForm }: FormikHelpers<ProjectDetailsFormValues>
  ) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
    console.log(values)
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
          <FormikInput name="chargeCode" label="Project Charge Code" required
                       description='Project Charge Code cannot be changed' />
          <FormikInput name="primaryFieldID" label="Primary Field of Science" required  />
          <FormikInput name="secondaryFieldID" label="Secondary Field of Science" />
          <FormikTextarea name="abstract" label="Description" required  />
          
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
                  The project details were updated.
                </SectionMessage>
              )}
              {isError && (
                <SectionMessage type="warning">
                  There was an error updating your project details.
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
