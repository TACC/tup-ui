import React from 'react';

import { Formik, Form, FormikHelpers } from 'formik';
import { FormikFileInput, FormikTextarea } from '@tacc/core-wrappers';
import { FormGroup } from 'reactstrap';
import { Button, InlineMessage } from '@tacc/core-components';
import { useTicketReply } from '@tacc/tup-hooks';
import * as Yup from 'yup';
import './TicketModal.global.css';

interface TicketReplyFormValues {
  text: string;
  files: File[];
}

const formSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

const defaultValues: TicketReplyFormValues = {
  text: '',
  files: [],
};

export const TicketReplyForm: React.FC<{ ticketId: string }> = ({
  ticketId,
}) => {
  const mutation = useTicketReply(ticketId);
  const { mutate, isLoading, isError } = mutation;

  const onSubmit = (
    values: TicketReplyFormValues,
    { resetForm }: FormikHelpers<TicketReplyFormValues>
  ) => {
    const formData = new FormData();
    formData.append('text', values['text']);
    (values.files || []).forEach((file) => formData.append('files', file));
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
              required
            />
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
