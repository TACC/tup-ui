import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { useProfile, useTicketCreate } from '@tacc/tup-hooks';
import {
  FormikInput,
  FormikTextarea,
  FormikFileInput,
} from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import { CreateTicketFormValues } from '..';
import styles from './TicketCreateForm.module.css';

const formShape = {
  subject: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  cc: Yup.string().test('email', 'Invalid email', (emails) =>
    (emails ?? 'placeholder@x.y.z')
      .split(/[\s,]+/)
      .every((email) => Yup.string().min(1).email().isValidSync(email))
  ),
};

const formSchema = Yup.object().shape(formShape);

export const TicketCreateForm: React.FC = () => {
  const { data: profile } = useProfile();
  const { firstName, lastName, email } = profile ?? {};

  const defaultValues = useMemo<CreateTicketFormValues>(
    () => ({
      subject: '',
      description: '',
      first_name: firstName ?? '',
      last_name: lastName ?? '',
      email: email ?? '',
      cc: '',
      files: [],
      // recaptchaResponse: '',
    }),
    [firstName, lastName, email]
  );

  const isAuthenticated = !!profile;
  const { mutate, isLoading, isSuccess, isError, data } = useTicketCreate();

  const onSubmit = (
    values: CreateTicketFormValues,
    { resetForm }: FormikHelpers<CreateTicketFormValues>
  ) => {
    const formData = new FormData();
    formData.append('email', values['email']);
    formData.append('subject', values['subject']);
    formData.append('description', values['description']);
    formData.append('cc', values['cc']);
    if (values.files) {
      values.files.forEach((file) => formData.append('files', file));
    }
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
        <Form className={styles['ticket-create-form']} id="ticket-create-form">
          {!isValid && <div>not valid</div>}
          <FormikInput name="subject" label="Subject" required description="" />
          <FormikTextarea
            name="description"
            label="Problem Description"
            rows={4}
            required
            description="Explain your steps leading up to the problem and include any error
                  reports"
          />

          <FormikFileInput
            name="files"
            label="Attach Files"
            description="Error reports and screenshots can be helpful for diagnostics"
            maxSize={3145728}
            maxSizeMessage="Max File Size: 3MB"
            required={false}
          />

          <div className={styles['form-row']}>
            <FormikInput
              name="first_name"
              label="First Name"
              required
              disabled={isAuthenticated}
              description=""
            />
            <FormikInput
              name="last_name"
              label="Last Name"
              required
              disabled={isAuthenticated}
              description=""
            />
          </div>
          <div className={styles['form-row']}>
            <FormikInput
              name="email"
              label="Email"
              type="email"
              required
              disabled={isAuthenticated}
              description=""
            />

            <FormikInput
              name="cc"
              label="Cc"
              required={false}
              description="Separate emails with commas"
            />
          </div>
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
                  Ticket with ID {data} was created.
                </SectionMessage>
              )}
              {isError && (
                <SectionMessage type="warning">
                  There was an error creating your ticket.
                </SectionMessage>
              )}
            </div>
            <Button
              attr="submit"
              type="primary"
              isLoading={isLoading}
              disabled={!isValid || isLoading}
            >
              Add Ticket
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};
