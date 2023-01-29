import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { useProjects, useAbstract } from '@tacc/tup-hooks';
import { FormikInput } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import { AbstractFormValues } from '../'
import styles from './ProjectAbstractEditModal';

const formShape = {
  description: Yup.string().required('Required'),
};

const formSchema = Yup.object().shape(formShape);

export const ProjectAbstractEditForm: React.FC<{ 
    projectId: number }> 
    = ({ projectId }) => {

  const details = useProjects();
  const project_data = details?.data ?? [];
  const projectDetails = project_data.find((desc) => desc.id === projectId);
  const { description } = projectDetails ?? {};

  const defaultValues = useMemo<AbstractFormValues>(
    () => ({
      description: description ?? '',
    }),
    [description]
  );

  const { mutate, isLoading, isSuccess, isError, data } = useAbstract(projectId);

  const onSubmit = (
    values: AbstractFormValues,
    { resetForm }: FormikHelpers<AbstractFormValues>
  ) => {
    const formData = new FormData();
    formData.set('description', values['description']); 

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
        <Form>
          <FormikInput name="description" label="Description" required  />
          
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
                  The description was updated.
                </SectionMessage>
              )}
              {isError && (
                <SectionMessage type="warning">
                  There was an error updating your description.
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
