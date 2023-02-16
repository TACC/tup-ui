import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import {
  usePublications,
  usePublicationEdit,
  ProjectPublicationBody,
} from '@tacc/tup-hooks';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import ProjectPublicationFormFields from './ProjectPublicationFormFIelds';
import styles from './ProjectPublicationForm.module.css';

const formShape = {
  title: Yup.string().required('Required'),
  authors: Yup.string().required('Required'),
  yearPublished: Yup.number().required('Required'),
  publisher: Yup.string(),
  url: Yup.string(),
  venue: Yup.string(),
  userCitedTacc: Yup.bool(),
};

const formSchema = Yup.object().shape(formShape);

export const ProjectPublicationEditForm: React.FC<{
  projectId: number;
  publicationId: number;
}> = ({ projectId, publicationId }) => {
  const publication = usePublications(projectId);
  const pub_stuff = publication?.data ?? [];
  const pub_data = pub_stuff?.find((e) => e.id === publicationId);
  const {
    title,
    authors,
    yearPublished,
    publisher,
    url,
    venue,
    userCitedTacc,
  } = pub_data ?? {};

  const defaultValues = useMemo<ProjectPublicationBody>(
    () => ({
      title: title ?? '',
      authors: authors ?? '',
      yearPublished: yearPublished ?? undefined,
      publisher: publisher ?? '',
      url: url ?? '',
      venue: venue ?? '',
      userCitedTacc: userCitedTacc ?? false,
    }),
    [title, authors, yearPublished, publisher, url, venue, userCitedTacc]
  );

  const { mutate, isLoading, isSuccess, isError } = usePublicationEdit(
    projectId,
    publicationId
  );

  const onSubmit = (
    values: ProjectPublicationBody,
    { resetForm }: FormikHelpers<ProjectPublicationBody>
  ) => {
    console.log(values);

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
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                attr="submit"
                type="primary"
                isLoading={isLoading}
                disabled={!isValid || isLoading}
              >
                Save
              </Button>
            </div>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};
