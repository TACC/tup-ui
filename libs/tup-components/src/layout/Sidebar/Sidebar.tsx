import React, { useState } from 'react';
import { Button } from '@tacc/core-components';
import { FeedbackModal } from '@tacc/tup-components';
import { Navbar, NavItem } from '@tacc/core-wrappers';
import { useAuth } from '@tacc/tup-hooks';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { loggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles['root']}>
      <Navbar>
        <NavItem end icon="dashboard" to={'/'}>
          Dashboard
        </NavItem>
        <NavItem icon="allocations" to={'/projects'}>
          Projects & Allocations
        </NavItem>
        <NavItem icon="multiple-coversation" to={'/tickets'}>
          Tickets
        </NavItem>
        {loggedIn && (
          <NavItem icon="exit" to={'/logout'}>
            Log Out
          </NavItem>
        )}
      </Navbar>
      <Button type="link" onClick={() => setIsModalOpen(true)}>
        Leave Feedback
      </Button>
      {isModalOpen && <FeedbackModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Sidebar;
