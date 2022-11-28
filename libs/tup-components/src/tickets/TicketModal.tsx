import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from 'react';
import { Column } from 'react-table';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { FormikInput } from '@tacc/core-wrappers';
import {
  CardHeader,
  CardBody,
  Card,
  Collapse,
  Container,
  Row,
  Col,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import {
  Button,
  FileInputDropZoneFormField,
  Icon,
  InfiniteScrollTable,
  LoadingSpinner,
  InlineMessage,
} from '@tacc/core-components';
import {
  useGetFileAttachment,
  useGetTicketDetails,
  useGetTicketHistory,
  useTicketReply,
} from '@tacc/tup-hooks';
import { formatDateTime } from '../utils/timeFormat';
import { historyCardParams } from '.';
import * as Yup from 'yup';
import './TicketModal.scss';

const formSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

const Attachments: React.FC<{
  attachments: Array<Array<any>>;
  ticketId: string;
}> = ({ attachments, ticketId }) => {
  // const infiniteScrollCallback = useCallback(() => {});
  const noDataText = 'No attachments to display.';
  const json = attachments.map(function attachmentAcessor(x) {
    return {
      attachment_id: x[0],
      attachment_name: x[1],
    };
  });

  type attachmentJson = {
    attachment_id: string;
    attachment_name: string;
  };

  const columns = useMemo<Column<attachmentJson>[]>(
    () => [
      {
        Header: 'Attached Files',
        accessor: 'attachment_name',
        className: 'attachment-title',
        Cell: (el) => (
          <span
            title={el.value}
            id={`attachment${el.row.index}`}
            className="attachment__name"
          >
            {el.value}
          </span>
        ),
      },
      {
        Header: '',
        className: 'attachment-download',
        accessor: 'attachment_id',
        Cell: (el) => (
          <a
            href={`/tickets/${ticketId}/attachment/${el.value}`}
            className="link"
            target="_blank"
            rel="noreferrer noopener"
            key={el.value}
          >
            Download
          </a>
        ),
      },
    ],
    [ticketId]
  );

  return (
    <div>
      <InfiniteScrollTable
        tableColumns={columns}
        className="attachment-table"
        tableData={json ?? []}
        noDataText={noDataText}
      />
    </div>
  );
};
Attachments.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  ticketId: PropTypes.string.isRequired,
};

const TicketHistoryReply: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const mutation = useTicketReply(ticketId);
  const { mutate, isLoading, isSuccess, isError } = mutation;

  const defaultValues = useMemo(
    () => ({
      text: '',
      files: [],
    }),
    []
  );

  return (
    <Formik
      enableReinitialize
      initialValues={defaultValues}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        const formData = new FormData();
        formData.append('text', values['text']);
        if (values.files) {
          values.files.forEach((file) => formData.append('files', file));
        }
        mutate(formData, {
          onSuccess: () => resetForm(),
        });
      }}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form className="ticket-reply-form">
            <FormikInput
              name="text"
              label="Reply"
              type="textarea"
              className="ticket-reply-text-area"
              description=""
              required
            />
            <FileInputDropZoneFormField
              id="files"
              isSubmitted={isSubmitting}
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

TicketHistoryReply.propTypes = {
  ticketId: PropTypes.string.isRequired,
};

const TicketHistoryCard: React.FC<historyCardParams> = ({
  // historyId,
  created,
  creator,
  isCreator,
  content,
  attachments,
  ticketId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIcon = isOpen ? (
    <i className="icon-action icon-collapse" />
  ) : (
    <i className="icon-action icon-expand" />
  );

  const ticketHeaderClassName = isCreator
    ? 'ticket-creator'
    : 'ticket-responder';
  const attachmentTitles = (attachments || []).filter(
    (a) => !a[1].toString().startsWith('untitled (')
  );

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onKeyDown = (e: any) => {
    if (e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <Card className="mt-1">
      <CardHeader tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>
        <span className="ticket-history-header d-inline-block text-truncate">
          <strong>
            <span
              className={ticketHeaderClassName}
              id="TicketHeader"
              role="button"
              aria-expanded={isOpen}
              aria-controls="CardBody"
            >
              {creator} | {`${formatDateTime(created)}`}
            </span>
            {!!attachmentTitles.length && (
              <span>
                {' '}
                <Icon name="link" />{' '}
              </span>
            )}
          </strong>{' '}
          {isOpen ? '' : content}
        </span>
        {toggleIcon}
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody id="CardBody" role="region" aria-labelledby="TicketHeader">
          {content}
        </CardBody>
        {!!attachmentTitles.length && (
          <CardBody className="attached">
            <Attachments attachments={attachmentTitles} ticketId={ticketId} />
          </CardBody>
        )}
      </Collapse>
    </Card>
  );
};

TicketHistoryCard.propTypes = {
  // historyId: PropTypes.number.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  creator: PropTypes.string.isRequired,
  isCreator: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  ticketId: PropTypes.string.isRequired,
};

export const TicketHistory: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const ticketHistoryEndRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useGetTicketHistory(ticketId);
  const scrollToBottom = () => {
    ticketHistoryEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [data]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isError && (
        <InlineMessage type="error" className="ticket-history-error">
          Something went wrong.
        </InlineMessage>
      )}
      {data?.map((d) => (
        <TicketHistoryCard
          key={d.id}
          created={new Date(d.Created)}
          creator={d.Creator}
          isCreator={false} //TODO: backend revision needed to match CEP
          content={d.Content}
          attachments={d.Attachments}
          ticketId={d.Ticket}
        />
      ))}
      <div ref={ticketHistoryEndRef} />
    </>
  );
};
TicketHistory.propTypes = {
  ticketId: PropTypes.string.isRequired,
};

const TicketModal: React.FC = () => {
  const ticketId = useParams().ticketId;
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const modalAlwaysOpen = true;
  const { data, isLoading, isError } = useGetTicketDetails(ticketId ?? '');

  return (
    <Modal
      className="ticket-model-content"
      isOpen={modalAlwaysOpen}
      toggle={close}
      size="lg"
    >
      <ModalHeader toggle={close} charCode="&#xe912;">
        <span className="ticket-id">Ticket {ticketId}</span>
        <span className="ticket-subject">{data?.Subject}</span>
      </ModalHeader>
      <ModalBody>
        <Container className="ticket-detailed-view-container">
          <Row className="ticket-detailed-view-row">
            <Col lg="7" className="ticket-history">
              <TicketHistory ticketId={ticketId ?? ''} />
            </Col>
            <Col lg="5">
              <TicketHistoryReply ticketId={ticketId ?? ''} />
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default TicketModal;
