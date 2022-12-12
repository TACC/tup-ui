import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
  KeyboardEvent,
} from 'react';
import { Column, useTable } from 'react-table';
import { useParams, useNavigate } from 'react-router-dom';
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
  LoadingSpinner,
  InlineMessage,
} from '@tacc/core-components';
import {
  useGetTicketDetails,
  useGetTicketHistory,
  useJwt,
  useTicketReply,
  useConfig,
  TicketHistoryEntry,
} from '@tacc/tup-hooks';
import { formatDateTime } from '../utils/timeFormat';
import { downloadAttachment } from '../utils/downloadAttachment';
import { historyCardParams } from '.';
import * as Yup from 'yup';
import './TicketModal.global.css';

const formSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
});

const Attachments: React.FC<{
  attachments: Array<Array<any>>;
  ticketId: string;
}> = ({ attachments, ticketId }) => {
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
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
          <Button
            type={'link'}
            onClick={useCallback(
              () => downloadAttachment(ticketId, el.value, baseUrl, jwt),
              [el.value]
            )}
          >
            Download
          </Button>
        ),
      },
    ],
    [ticketId, baseUrl, jwt]
  );

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      columns,
      data: json,
    });

  return (
    <div className="o-fixed-header-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length ? (
            rows.map((row, idx) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>No attachments to display.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
Attachments.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  ticketId: PropTypes.string.isRequired,
};

const TicketHistoryReply: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const mutation = useTicketReply(ticketId);
  const { mutate, isLoading, isError } = mutation;

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
  created,
  creator,
  isCreator,
  content,
  attachments,
  ticketId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIcon = isOpen ? (
    <Icon name="icon-action icon-contract" />
  ) : (
    <Icon name="icon-action icon-expand" />
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

  const onKeyDown = (e: KeyboardEvent) => {
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
      {data?.map((d: TicketHistoryEntry) => (
        <TicketHistoryCard
          key={d.id}
          created={new Date(d.Created)}
          creator={d.Creator}
          isCreator={false} // tup-services revision needed to match CEP behavior
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
  const ticketId = useParams().ticketId ?? '';
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const modalAlwaysOpen = true;
  const { data } = useGetTicketDetails(ticketId);

  const closeBtn = (
    <button className="close" onClick={close} type="button">
      &times;
    </button>
  );

  return (
    <Modal
      className="ticket-model-content"
      isOpen={modalAlwaysOpen}
      toggle={close}
      size="lg"
    >
      <ModalHeader toggle={close} close={closeBtn}>
        <span className="ticket-id">Ticket {ticketId}</span>
        <span className="ticket-subject">{data?.Subject}</span>
      </ModalHeader>
      <ModalBody>
        <Container className="ticket-detailed-view-container">
          <Row className="ticket-detailed-view-row">
            <Col lg="7" className="ticket-history">
              <TicketHistory ticketId={ticketId} />
            </Col>
            <Col lg="5">
              <TicketHistoryReply ticketId={ticketId} />
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default TicketModal;
