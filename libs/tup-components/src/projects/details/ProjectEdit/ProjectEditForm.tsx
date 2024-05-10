import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import {
  useProjects,
  useProjectUpdate,
  useProjectScienceField,
  ProjectEditBody,
} from '@tacc/tup-hooks';
import {
  FormikInput,
  FormikSelect,
  FormikTextarea,
} from '@tacc/core-components';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';

const formShape = {
  title: Yup.string().required('Required'),
  fieldId: Yup.number().moreThan(1, 'Required'),
  secondaryFieldId: Yup.number(),
  description: Yup.string().required('Required'),
  chargeCode: Yup.string().required('Required'),
};

const formSchema = Yup.object().shape(formShape);

export const ProjectAbstractEditForm: React.FC<{
  projectId: number;
}> = ({ projectId }) => {
  const { data } = useProjects();
  const projectDetails = (data ?? []).find(
    (project) => project.id === projectId
  );
  const { description, title, chargeCode, fieldId, secondaryFieldId } =
    projectDetails ?? {};

  const defaultValues = useMemo<ProjectEditBody>(
    () => ({
      description: description ?? '',
      title: title ?? '',
      chargeCode: chargeCode ?? '',
      fieldId: fieldId ?? 1,
      secondaryFieldId: secondaryFieldId ?? 1,
    }),
    [description, title, chargeCode, fieldId, secondaryFieldId]
  );

  const { mutate, isLoading, isSuccess, isError } = useProjectUpdate(projectId);
  const scienceFields = useProjectScienceField().data ?? [];

  const onSubmit = (
    values: ProjectEditBody,
    { resetForm }: FormikHelpers<ProjectEditBody>
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
          <FormikInput
            style={{ maxWidth: '100%' }}
            name="title"
            label="Title"
            required
          />
          <FormikTextarea
            rows={5}
            style={{ maxWidth: '100%', resize: 'none' }}
            name="description"
            label="Description"
            required
          />
          <FormikSelect label="Field of Science" name="fieldId" required>
            {scienceFields.map((field) => (
              <option key={field.id} value={field.id}>
                {[...new Array(field.depth)].map((_) => '--- ')}
                {field.id === 1 ? 'Select Field of Science' : field.name}
              </option>
            ))}
          </FormikSelect>
          <FormikSelect
            label="Secondary Field of Science"
            name="secondaryFieldId"
          >
            {scienceFields.map((field) => (
              <option key={field.id} value={field.id}>
                {[...new Array(field.depth)].map((_) => '--- ')}
                {field.id === 1
                  ? 'Select Secondary Field of Science'
                  : field.name}
              </option>
            ))}
          </FormikSelect>
          <FormikInput
            name="chargeCode"
            label="Charge Code"
            description="Project Charge Code cannot be changed."
            disabled
            required
          />

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
