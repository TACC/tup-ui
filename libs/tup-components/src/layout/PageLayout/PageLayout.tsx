import React from 'react';
import styles from './PageLayout.module.css';

interface LayoutProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ left, right, top, bottom }) => (
  <div className={styles['layout-grid']}>
    <div className={styles['header']}>{top}</div>
    <div className={styles['sidebar']}>{left}</div>
    <div className={styles['content']}>{right}</div>
    <div className={styles['footer']}>{bottom}</div>
  </div>
);

export default Layout;
