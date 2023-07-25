import React, { useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
//import ReCAPTCHA from 'react-google-recaptcha';
import { useProfile, useTicketCreate } from '@tacc/tup-hooks';
import {
  FormikInput,
  FormikTextarea,
  FormikFileInput,
  FormikSelect,
} from '@tacc/core-wrappers';
import * as Yup from 'yup';
import { ModalFooter } from 'reactstrap';
import { Button, SectionMessage } from '@tacc/core-components';
import { CreateTicketFormValues, QUEUE_MAP } from '..';
import styles from './TicketCreateForm.module.css';

const formShape = {
  subject: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  category: Yup.string().required('Required'),
  resource: Yup.string().required('Required'),
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
      category: '',
      resource: '',
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
    let messageBody = ``;
    messageBody += `Category: ${values.category}\n`;
    messageBody += `System/Resource: ${values.resource}\n`;
    messageBody += `Requestor: ${values.first_name} ${values.last_name} (${values.email})\n\n`;
    messageBody += `${values.description}`;

    const formData = new FormData();
    formData.append('email', values['email']);
    formData.append('subject', values['subject']);
    formData.append('description', messageBody);
    formData.append('cc', values['cc']);
    formData.append('queue', values.category && QUEUE_MAP[values.category]);
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
          <FormikSelect name="category" label="Category" required>
            <option value="">Please Choose One</option>
            <option>Allocations</option>
            <option>Running Jobs or Using TACC Resources</option>
            <option>Login Issues</option>
            <option>Multi-factor Authentication</option>
            <option>Other</option>
          </FormikSelect>
          <FormikSelect name="resource" label="System/Resource" required>
            <option value="">Please Choose One</option>
            <option>Corral (corral-login.tacc.utexas.edu)</option>
            <option>Corral iRODS(icat.corral.tacc.utexas.edu)</option>
            <option>Corral-Protected(corral-protected.tacc.utexas.edu)</option>
            <option>Frontera(frontera.tacc.utexas.edu)</option>
            <option>Jetstream(jetstream.tacc.utexas.edu)</option>
            <option>Lonestar6(lonestar6.tacc.utexas.edu)</option>
            <option>Longhorn(longhorn.tacc.utexas.edu)</option>
            <option>Ranch(ranch.tacc.utexas.edu)</option>
            <option>Stampede2(stampede2.tacc.utexas.edu)</option>
            <option>Vislab(stallion.tacc.utexas.edu)</option>
            <option>Cyclone(cyclone.tacc.utexas.edu)</option>
            <option>Cloud and Interactive Computing (Agave API)</option>
            <option>Cloud and Interactive Computing (Abaco API)</option>
            <option>Cloud and Interactive Computing (JupyterHub)</option>
            <option>Other</option>
          </FormikSelect>
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
