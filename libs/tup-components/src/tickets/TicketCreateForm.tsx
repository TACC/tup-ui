import React, { useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Alert,
  Col,
  Container,
  FormGroup,
  ModalBody,
  ModalFooter,
  Row,
  Spinner,
} from 'reactstrap';
import {
  Button,
  FormField,
  FileInputDropZoneFormField,
} from '@tacc/core-components';
//import ReCAPTCHA from 'react-google-recaptcha';

export const TicketCreateForm = () => {
  const defaultValues = useMemo(
    () => ({
      subject: '',
      problem_description: '',
      first_name: '',
      last_name: '',
      email: '',
      cc: '',
      attachments: [],
      recaptchaResponse: '',
    }),
    []
  );

  const isAuthenticated = true;

  const formShape = {
    subject: Yup.string().required('Required'),
    problem_description: Yup.string().required('Required'),
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
      onSubmit={(values, { resetForm }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));
        if (values.attachments) {
          values.attachments.forEach((attach) =>
            formData.append('attachments', attach)
          );
        }
      }}
    >
      {({ isSubmitting, isValid, setFieldValue }) => {
        return (
          <Form className="ticket-create-form">
            <ModalBody className="ticket-create-modal-body">
              <FormGroup>
                <FormField name="subject" label="Subject" required />
                <FormField
                  name="problem_description"
                  label="Problem Description"
                  className="ticket-description-text-area"
                  type="textarea"
                  required
                  description="Explain your steps leading up to the problem and include any error
            reports"
                />
                {/* <FileInputDropZoneFormField
                  id="attachments"
                  isSubmitted={isSubmitting}
                  description="Error reports and screenshots can be helpful for diagnostics"
                  maxSizeMessage="Max File Size: 3MB"
                  maxSize={3145728}
                /> */}
                <Container>
                  <Row>
                    <Col lg="6">
                      <FormField
                        name="first_name"
                        label="First Name"
                        required
                        disabled={isAuthenticated}
                      />
                    </Col>
                    <Col lg="6">
                      <FormField
                        name="last_name"
                        label="Last Name"
                        required
                        disabled={isAuthenticated}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormField
                        name="email"
                        label="Email"
                        required
                        disabled={isAuthenticated}
                      />
                    </Col>
                    <Col lg="6">
                      <FormField
                        name="cc"
                        label="Cc"
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
                {/* {creatingSuccess && (
                  <CreatedTicketInformation
                    ticketId={createdTicketId}
                    provideDashBoardLinkOnSuccess={
                      isAuthenticated && provideDashBoardLinkOnSuccess
                    }
                  />
                )}
                {creatingError && (
                  <Alert color="warning">
                    Ticket creating error: {creatingErrorMessage}
                  </Alert>
                )} */}
                <Button
                  attr="submit"
                  type="primary"
                  size="medium"
                  // disabled={!isValid || isSubmitting || creating}
                  // isLoading={creating}
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
