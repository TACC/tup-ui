import React, { useMemo } from 'react';
import {
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from '@tacc/core-wrappers';
import {
  Button,
  FileInputDropZoneFormField,
  SectionMessage,
} from '@tacc/core-components';
import {
  useAuth,
  useTicketCreate,
  useTicketCreateNoAuth,
} from '@tacc/tup-hooks';
import { feedbackFormValues } from './';

const FeedbackModal: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsModalOpen }) => {
  const modalAlwaysOpen = true;
  const { loggedIn } = useAuth();

  const close = () => {
    setIsModalOpen(false);
  };

  const closeBtn = (
    <button className="close" onClick={close} type="button">
      &times;
    </button>
  );

  const defaultValues = useMemo(
    () => ({
      subject: 'Feedback from TACC User Portal',
      description: '',
      files: [],
      // recaptchaResponse: '',
    }),
    []
  );

  const mutation = useTicketCreate();
  const mutationNoAuth = useTicketCreateNoAuth();
  let {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data: ticketId,
  } = mutation;
  if (!loggedIn) {
    ({
      mutate,
      isLoading,
      isSuccess,
      isError,
      error,
      data: ticketId,
    } = mutationNoAuth);
  }

  const formShape = {
    subject: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  };

  const formSchema = Yup.object().shape(formShape);

  return (
    <Modal
      //   modalClassName={styles['root']}
      isOpen={modalAlwaysOpen}
      toggle={close}
      size="lg"
      contentClassName="ticket-create-modal-content"
    >
      <ModalHeader toggle={close} close={closeBtn}>
        Feedback
      </ModalHeader>
      <ModalBody>
        <p>
          User feedback helps to improve the website. If you have suggestions,
          feature requests, or comments (negative or positive), submit this form
          and they will be taken into consideration.
        </p>
        <p>
          If you need assistance,{' '}
          <Link onClick={close} to={'ticket-create'}>
            submit a ticket
          </Link>
          .
        </p>
        <Formik
          validateOnMount
          enableReinitialize
          initialValues={defaultValues}
          validationSchema={formSchema}
          onSubmit={(values: feedbackFormValues, { resetForm }) => {
            const formData = new FormData();
            formData.append('subject', values['subject']);
            formData.append('description', values['description']);
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
                      name="description"
                      label="Feedback"
                      type="textarea"
                      required
                      description=""
                    />
                    <FileInputDropZoneFormField
                      id="files"
                      isSubmitted={isSubmitting}
                      description="Error reports and screenshots can be helpful for diagnostics"
                      maxSizeMessage="Max File Size: 3MB"
                      maxSize={3145728}
                    />
                    {/* {!isAuthenticated && recaptchaSiteKey && (
                    <ReCAPTCHA
                      name="recaptcha"
                      sitekey={recaptchaSiteKey}
                      onChange={(e) => {
                        setFieldValue('recaptchaResponse', e);
                      }}
                    />
                  )} */}
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <div className="ticket-create-button-row">
                    {isSuccess && (
                      <SectionMessage type="success">
                        Feedback successfully submitted as a ticket (#{ticketId}
                        ) .
                      </SectionMessage>
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
                      Submit
                    </Button>
                  </div>
                </ModalFooter>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default FeedbackModal;
