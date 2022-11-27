import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from 'react';
import { Column } from 'react-table';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import { InfiniteScrollTable } from '@tacc/core-components';
import { useGetTicketDetails } from '@tacc/tup-hooks';
import { formatDateTime } from '../utils/timeFormat';
import { historyCardParams } from '.';
import * as Yup from 'yup';

const Attachments: React.FC<{
  attachments: Array<[File, string]>;
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
        tableData={json}
        noDataText={noDataText}
      />
    </div>
  );
};
Attachments.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.array).isRequired,
  ticketId: PropTypes.string.isRequired,
};

const TicketHistoryCard: React.FC<historyCardParams> = ({
  historyId,
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
    console.log('hello');
  };

  const onKeyDown = (e: any) => {
    if (e.key === ' ') {
      e.preventDefault();
      console.log('hello');
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
  historyId: PropTypes.number.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  creator: PropTypes.string.isRequired,
  isCreator: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.array).isRequired,
  ticketId: PropTypes.string.isRequired,
};

const TicketModal: React.FC = () => {
  const ticketId = useParams().ticketId;
  const navigate = useNavigate();
  const close = () => navigate(-1);
  const modalAlwaysOpen = true;
  const { data, isLoading, isError } = useGetTicketDetails(ticketId);
  console.log(data);

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
          {/* <Row className="ticket-detailed-view-row">
        <Col lg="7" className="ticket-history">
          <TicketHistory />
        </Col>
        <Col lg="5">
          <TicketHistoryReply ticketId={ticketId} />
        </Col>
      </Row> */}
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default TicketModal;
