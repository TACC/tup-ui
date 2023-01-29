import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { usePublications, usePublicationEdit } from '@tacc/tup-hooks';
import { FormikInput, FormikCheck } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import { PublicationFormValues } from '../'
import styles from './ProjectPublicationEditModal';

const formShape = {
  title: Yup.string().required('Required'),
  authors: Yup.string().required('Required'),
  yearPublished: Yup.number(),
  publisher: Yup.string(),
  url: Yup.string(),
  venue: Yup.string(),
  userCitedTacc: Yup.bool(),
};

const formSchema = Yup.object().shape(formShape);

export const ProjectPublicationEditForm: React.FC<{ 
    projectId: number, publicationId: number }> 
    = ({ projectId, publicationId }) => {

  const publication = usePublications(projectId);
  const pub_stuff = publication?.data ?? [];
  const pub_data = pub_stuff?.find((e) => e.id === publicationId)
  const { title, authors, yearPublished, publisher, url, venue, userCitedTacc } = pub_data ?? {};

  const defaultValues = useMemo<PublicationFormValues>(
    () => ({
      title: title ?? '',
      authors: authors ?? '',
      yearPublished: yearPublished ?? NaN,
      publisher: publisher ?? '',
      url: url ?? '',
      venue: venue ?? '',
      userCitedTacc: userCitedTacc ?? false,
    }),
    [title, authors, yearPublished, publisher, url, venue, userCitedTacc]
  );

  const { mutate, isLoading, isSuccess, isError, data } = usePublicationEdit(projectId, publicationId);

  const onSubmit = (
    values: PublicationFormValues,
    { resetForm }: FormikHelpers<PublicationFormValues>
  ) => {
    const formData = new FormData();
    formData.set('title', values['title']);
    formData.set('authors', values['authors']);
    formData.set('yearPublished', values['yearPublished'].toString());
    formData.set('publisher', values['publisher']);
    formData.set('url', values['url']);
    formData.set('venue', values['venue']);
    formData.set('userCitedTacc', values['userCitedTacc'].toString());

    console.log(values['title'])
    let result = {title: values['title'], }
    

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
