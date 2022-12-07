import React, { useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
//import ReCAPTCHA from 'react-google-recaptcha';
import {
  UserProfile,
  useTicketCreate,
  useTicketCreateNoAuth,
} from '@tacc/tup-hooks';
import { FormikInput } from '@tacc/core-wrappers';
import * as Yup from 'yup';
import {
  Col,
  Container,
  FormGroup,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap';
import {
  Button,
  FileInputDropZoneFormField,
  SectionMessage,
} from '@tacc/core-components';
import { formValues } from './';
import './TicketCreateForm.global.css';

const CreatedTicketInformation: React.FC<{
  provideDashBoardLinkOnSuccess: boolean;
  ticketId: any;
}> = ({ provideDashBoardLinkOnSuccess, ticketId }) => {
  if (!ticketId) {
    return null;
  }

  if (provideDashBoardLinkOnSuccess) {
    return (
      <SectionMessage type="success" className="ticket-create-info-alert">
        <Link className="ticket-link" to={`tickets/${ticketId}`}>
          Ticket (#{ticketId})
        </Link>{' '}
        was created. Support staff will contact you regarding your problem.
      </SectionMessage>
    );
  }
  return (
    <SectionMessage type="success" className="ticket-create-info-alert">
      Ticket (#{ticketId}) was created. Support staff will contact you via email
      regarding your problem.
    </SectionMessage>
  );
};

export const TicketCreateForm: React.FC<{ profile?: UserProfile }> = ({
  profile,
}) => {
  const defaultValues = useMemo(
    () => ({
      subject: '',
      description: '',
      first_name: profile?.firstName ?? '',
      last_name: profile?.lastName ?? '',
      email: profile?.email ?? '',
      cc: '',
      files: [],
      // recaptchaResponse: '',
    }),
    [profile]
  );

  const isAuthenticated = profile != null;

  const provideDashBoardLinkOnSuccess = true;

  const mutation = useTicketCreate();
  const mutationNoAuth = useTicketCreateNoAuth();
  let { mutate, isLoading, isSuccess, isError, error, data } = mutation;
  if (!isAuthenticated) {
    ({ mutate, isLoading, isSuccess, isError, error, data } = mutationNoAuth);
  }

  const formShape = {
    subject: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    cc: Yup.array()
      .transform((value, originalValue) => {
        if (Yup.string().email().isType(value) && value !== null) {
          return value;
        }
        return originalValue ? originalValue.split(/[\s,]+/) : [];
      })
      .of(Yup.string().email('Invalid email')),
  };

  const formSchema = Yup.object().shape(formShape);

  return (
    <Formik
      validateOnMount
      enableReinitialize
      initialValues={defaultValues}
      validationSchema={formSchema}
      onSubmit={(values: formValues, { resetForm }) => {
        const formData = new FormData();
        formData.append('email', values['email']);
        formData.append('subject', values['subject']);
        formData.append('description', values['description']);
        formData.append('cc', values['cc']);
        if (values.files) {
          values.files.forEach((file) => formData.append('files', file));
        }
        mutate(formData, {
          onSuccess: () => resetForm(),
        });
      }}
    >
      {({ isSubmitting, isValid, setFieldValue }) => {
        return (
          <Form className="ticket-create-form">
            <ModalBody className="ticket-create-modal-body">
              <FormGroup>
                <FormikInput
                  name="subject"
                  label="Subject"
                  required
                  description=""
                />
                <FormikInput
                  name="description"
                  label="Problem Description"
                  type="textarea"
                  required
                  description="Explain your steps leading up to the problem and include any error
                  reports"
                />
                <FileInputDropZoneFormField
                  id="files"
                  isSubmitted={isSubmitting}
                  description="Error reports and screenshots can be helpful for diagnostics"
                  maxSizeMessage="Max File Size: 3MB"
                  maxSize={3145728}
                />
                <Container>
                  <Row>
                    <Col lg="6">
                      <FormikInput
                        name="first_name"
                        label="First Name"
                        required
                        disabled={isAuthenticated}
                        description=""
                      />
                    </Col>
                    <Col lg="6">
                      <FormikInput
                        name="last_name"
                        label="Last Name"
                        required
                        disabled={isAuthenticated}
                        description=""
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormikInput
                        name="email"
                        label="Email"
                        type="email"
                        required
                        disabled={isAuthenticated}
                        description=""
                      />
                    </Col>
                    <Col lg="6">
                      <FormikInput
                        name="cc"
                        label="Cc"
                        required={false}
                        description="Separate emails with commas"
                      />
                    </Col>
                  </Row>
                  {/* {!isAuthenticated && recaptchaSiteKey && (
                    <ReCAPTCHA
                      name="recaptcha"
                      sitekey={recaptchaSiteKey}
                      onChange={(e) => {
                        setFieldValue('recaptchaResponse', e);
                      }}
                    />
                  )} */}
                </Container>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <div className="ticket-create-button-row">
                {isSuccess && (
                  <CreatedTicketInformation
                    ticketId={data}
                    provideDashBoardLinkOnSuccess={
                      isAuthenticated && provideDashBoardLinkOnSuccess
                    }
                  />
                )}
                {isError && (
                  <SectionMessage type="warning">
                    Ticket creating error: {error?.message}
                  </SectionMessage>
                )}
                <Button
                  attr="submit"
                  type="primary"
                  size="medium"
                  disabled={!isValid || isSubmitting || isLoading}
                  isLoading={isLoading}
                >
                  Add Ticket
                </Button>
              </div>
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};
