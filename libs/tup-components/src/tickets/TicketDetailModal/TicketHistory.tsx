import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { CardHeader, CardBody, Card, Collapse } from 'reactstrap';
import {
  Button,
  Icon,
  LoadingSpinner,
  InlineMessage,
} from '@tacc/core-components';
import {
  useGetTicketHistory,
  TicketHistoryEntry,
  useGetFileAttachment,
  useProfile,
} from '@tacc/tup-hooks';
import { formatDateTime } from '../../utils/timeFormat';
import './TicketModal.global.css';

const Attachments: React.FC<{
  attachments: Array<[number, string]>;
  ticketId: string;
}> = ({ attachments, ticketId }) => {
  const { download } = useGetFileAttachment(ticketId);

  return (
    <table>
      <thead>
        <tr>
          <th>Attached Files</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {attachments.map(([attachmentId, attachmentName]) => (
          <tr key={attachmentId}>
            <td>{attachmentName}</td>
            <td>
              <Button type={'link'} onClick={() => download(attachmentId)}>
                Download
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TicketHistoryCard: React.FC<{
  history: TicketHistoryEntry;
  defaultOpen?: boolean;
}> = ({ history, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { data } = useProfile();

  const ticketHeaderClassName =
    data && data.username === history.Creator
      ? 'ticket-creator'
      : 'ticket-responder';
  const attachmentTitles = (history.Attachments || []).filter(
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
        <div
          className="ticket-history-header"
          id="TicketHeader"
          role="button"
          aria-expanded={isOpen}
          aria-controls="CardBody"
        >
          <div className="text-truncate">
            <span className={ticketHeaderClassName}>
              <strong>{history.Creator}</strong>
            </span>
            <span className="text-truncate">
              {isOpen ? '' : ` | ${history.Content}`}
            </span>
          </div>
          <div>
            <span className="ticket-history-header-date">{`${formatDateTime(
              new Date(history.Created)
            )}`}</span>
            {isOpen ? (
              <Icon size="xs" name="icon-action icon-contract" />
            ) : (
              <Icon size="xs" name="icon-action icon-expand" />
            )}
          </div>
        </div>
      </CardHeader>
      <Collapse isOpen={isOpen}>
        <CardBody id="CardBody" role="region" aria-labelledby="TicketHeader">
          {history.Content}
        </CardBody>
        {!!attachmentTitles.length && (
          <CardBody className="attached">
            <Attachments
              attachments={attachmentTitles}
              ticketId={history.Ticket}
            />
          </CardBody>
        )}
      </Collapse>
    </Card>
  );
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
      {data?.map((history: TicketHistoryEntry, idx) => (
        <TicketHistoryCard
          key={history.id}
          history={history}
          defaultOpen={idx === data.length - 1}
        />
      ))}
      <div ref={ticketHistoryEndRef} />
    </>
  );
};
