import React from 'react';

import { Formik, Form, FormikHelpers } from 'formik';
import {
  FormikFileInput,
  FormikTextarea,
  FormikSelect,
} from '@tacc/core-wrappers';
import { FormGroup } from 'reactstrap';
import { Button, InlineMessage } from '@tacc/core-components';
import { useTicketReply } from '@tacc/tup-hooks';
import * as Yup from 'yup';
import './TicketModal.global.css';

interface TicketReplyFormValues {
  text: string;
  files: File[];
  status: string;
}

const formSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

export const TicketReplyForm: React.FC<{ ticketId: string }> = ({
  ticketId,
}) => {
  const mutation = useTicketReply(ticketId);
  const { mutate, isLoading, isError } = mutation;

  const defaultValues: TicketReplyFormValues = {
    text: '',
    files: [],
    status: '',
  };

  const onSubmit = (
    values: TicketReplyFormValues,
    { resetForm }: FormikHelpers<TicketReplyFormValues>
  ) => {
    const formData = new FormData();
    formData.append('text', values['text']);
    (values.files || []).forEach((file) => formData.append('files', file));
    if (values.status) formData.append('status', values.status);
    mutate(formData, {
      onSuccess: () => resetForm(),
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={defaultValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form className="ticket-reply-form">
            <FormikTextarea
              rows={4}
              name="text"
              label="Reply"
              description=""
              style={{ maxWidth: '100%' }}
              required
            />
            <FormikSelect name="status" label="Status">
              <option value="">--</option>
              <option value="resolved">Resolved</option>
            </FormikSelect>
            <FormikFileInput
              name="files"
              required={false}
              label="Upload Files"
              description="Error reports and screenshots can be helpful for diagnostics"
              maxSizeMessage="Max File Size: 3MB"
              maxSize={3145728}
            />
            <FormGroup className="ticket-reply-submission">
              {isError && (
                <InlineMessage type="error">
                  Something went wrong.
                </InlineMessage>
              )}
              <Button
                attr="submit"
                type="primary"
                disabled={!isValid || isSubmitting || isLoading || isError}
                isLoading={isLoading}
              >
                Reply
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};
