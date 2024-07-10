import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useGetTicketDetails } from '@tacc/tup-hooks';
import './TicketModal.global.css';
import { TicketHistory } from './TicketHistory';
import { TicketReplyForm } from './TicketReplyForm';

const TicketModal: React.FC<{ ticketId: string; baseRoute: string }> = ({
  ticketId,
  baseRoute,
}) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const close = () => {
    if (state?.fromLink) return navigate(-1);

    // If the user got here from outside the portal,
    // navigate(-1) might take them somewhere unexpected.
    return navigate(baseRoute, { replace: true });
  };
  const modalAlwaysOpen = true;
  const { data } = useGetTicketDetails(ticketId);

  const closeBtn = (
    <button className="close" onClick={close} type="button">
      &times;
    </button>
  );

  return (
    <Modal
      className="ticket-model-content modal-dialog-centered"
      size="xl"
      isOpen={modalAlwaysOpen}
      toggle={close}
    >
      <ModalHeader toggle={close} close={closeBtn}>
        <span className="ticket-id">Ticket {ticketId}</span>
        <span className="ticket-subject">{data?.Subject}</span>
      </ModalHeader>
      <ModalBody style={{ height: '70vh' }}>
        <Container className="ticket-detailed-view-container">
          <Row className="ticket-detailed-view-row">
            <Col lg="7">
              <TicketHistory ticketId={ticketId} />
            </Col>
            <Col lg="5">
              <TicketReplyForm
                ticketId={ticketId}
                ticketStatus={data?.Status || ''}
              />
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default TicketModal;
