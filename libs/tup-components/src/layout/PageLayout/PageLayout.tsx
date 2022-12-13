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
    <header className={styles['header']}>{top}</header>
    <nav className={styles['nav']}>{left}</nav>
    <div className={styles['content']}>{right}</div>
    <footer className={styles['footer']}>{bottom}</footer>
  </div>
);

export default Layout;
