import React from 'react';

import { Formik, Form, FormikHelpers, Field } from 'formik';
import { FormikFileInput, FormikTextarea } from '@tacc/core-wrappers';
import { FormGroup } from 'reactstrap';
import { Button, InlineMessage } from '@tacc/core-components';
import { Ticket, useTicketReply } from '@tacc/tup-hooks';
import './TicketModal.global.css';

interface TicketReplyFormValues {
  text: string;
  files: File[];
  status: boolean;
}

/* This validates the form for the first textarea in the form.
This will also show the red required text underneath the textarea.
If this is implemented, you must also add the `validationSchema={formSchema}` attribute to the Formik component.
***
const formSchema = Yup.object().shape({
   text: Yup.string().required('Required'),
});
***
*/

export const TicketReplyForm: React.FC<{
  ticketId: string;
  ticketData?: Ticket;
}> = ({ ticketId, ticketData }) => {
  const mutation = useTicketReply(ticketId);
  const { mutate, isSuccess, isLoading, isError } = mutation;

  const defaultValues: TicketReplyFormValues = {
    text: '',
    files: [],
    status: false,
  };

  const onSubmit = (
    values: TicketReplyFormValues,
    { resetForm }: FormikHelpers<TicketReplyFormValues>
  ) => {
    const formData = new FormData();

    if (values.text.length === 0) {
      formData.append('text', '(Resolved with no reply.)');
    } else {
      formData.append('text', values['text']);
    }

    (values.files || []).forEach((file) => formData.append('files', file));
    values.status
      ? formData.append('status', 'resolved')
      : formData.append('status', '');

    mutate(formData, {
      onSuccess: () => resetForm(),
      onSettled: () => {
        setTimeout(() => {
          mutation.reset();
        }, 5000);
      },
    });
  };

  return (
    <Formik
      enableReinitialize
      // enable this line 25 for form validation.
      // validationSchema={formSchema}
      initialValues={defaultValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, dirty, values }) => {
        console.log(values);
        const isResolved = values.status;
        const replyIsEmpty = !values.text;

        let buttonText = 'Reply';

        if (isResolved) {
          if (replyIsEmpty) {
            buttonText = 'Resolve';
          } else {
            buttonText = 'Resolve with Reply';
          }
        }

        return (
          <Form className="ticket-reply-form">
            <FormikTextarea
              rows={4}
              name="text"
              label="Reply"
              description=""
              style={{ maxWidth: '100%' }}
              required={!isResolved}
            />
            <FormikFileInput
              name="files"
              required={false}
              label="Upload Files"
              description="Error reports and screenshots can be helpful for diagnostics"
              maxSizeMessage="Max File Size: 3MB"
              maxSize={3145728}
            />
            <div className="c-form__field">
              <label>Ticket Status</label>
              <menu>
                <li>
                  {ticketData?.Status !== 'resolved' ? (
                    <label>
                      <Field
                        type="checkbox"
                        name="status"
                        id="status"
                      />{' '}
                      My issue has been resolved
                    </label>
                  ) : (
                    <label>
                      <Field
                        type="checkbox"
                        name="status"
                        id="status"
                        checked
                        disabled
                      />{' '}
                      My issue has been resolved
                    </label>
                  )}
                </li>
              </menu>
              <div className="c-form__help">
                {ticketData?.Status === 'resolved'
                  ? '* Replying will reopen this ticket'
                  : 'This helps us determine which users still need assistance'}
              </div>
            </div>
            <FormGroup className="ticket-reply-submission">
              <Button
                attr="submit"
                type="primary"
                disabled={
                  !isValid || isSubmitting || isLoading || isError || !dirty
                }
                isLoading={isLoading}
              >
                {buttonText}
              </Button>
              {isSuccess && (
                <InlineMessage type="success">
                  Your reply has been sent.
                </InlineMessage>
              )}
              {isError && (
                <InlineMessage type="error">
                  Something went wrong.
                </InlineMessage>
              )}
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};
