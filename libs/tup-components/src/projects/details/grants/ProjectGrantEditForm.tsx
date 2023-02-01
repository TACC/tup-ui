import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useGrants, useGrantEdit, ProjectGrant } from '@tacc/tup-hooks';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import ProjectGrantFormFields from './ProjectGrantFormFields';
import styles from './ProjectGrantForm.module.css';

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

export const ProjectGrantEditForm: React.FC<{
  projectId: number;
  grantId: number;
}> = ({ projectId, grantId }) => {
  const grant = useGrants(projectId);
  const grant_data = (grant?.data ?? []).find((e) => e.id === grantId);
  const {
    title,
    grantNumber,
    piName,
    field,
    fundingAgency,
    awardNumber,
    awardAmount,
    start,
    end,
    nsfStatusCode,
    fieldId,
  } = grant_data ?? {};

  const defaultValues = useMemo<ProjectGrant>(
    () => ({
      id: grantId,
      title: title ?? '',
      grantNumber: grantNumber ?? '',
      piName: piName ?? '',
      field: field ?? '',
      fundingAgency: fundingAgency ?? '',
      awardNumber: awardNumber ?? '',
      awardAmount: awardAmount ?? undefined,
      start: start ? new Date(start).toLocaleDateString('en-CA') : '',
      end: end ? new Date(end).toLocaleDateString('en-CA') : '',
      nsfStatusCode: nsfStatusCode ?? '',
      fieldId: fieldId ?? 0,
    }),
    [
      grantId,
      title,
      grantNumber,
      piName,
      field,
      fundingAgency,
      awardNumber,
      awardAmount,
      start,
      end,
      nsfStatusCode,
      fieldId,
    ]
  );

  const { mutate, isLoading, isSuccess, isError } = useGrantEdit(
    projectId,
    grantId
  );

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
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};
