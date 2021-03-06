import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Icon from '../Icon';
import styles from './Sidebar.module.css';

function isNotEmptyString(props, propName, componentName) {
  if (!props[propName] || props[propName].replace(/ /g, '') === '') {
    return new Error(`No text passed to ${componentName}. Validation failed.`);
  }
  return null;
}

const SidebarItem = ({ to, iconName, label, children, disabled, hidden }) => {
  return (
    <NavItem>
      <NavLink
        tag={RRNavLink}
        to={to}
        disabled={disabled}
        className={styles['link']}
        activeClassName={styles['link--active']}
      >
        <Icon name={iconName} className={styles['icon']} />
        <span className={styles['text']}>{label}</span>
        {children}
      </NavLink>
    </NavItem>
  );
};
SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  label: isNotEmptyString,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};
SidebarItem.defaultProps = {
  children: null,
  disabled: false,
  hidden: false,
};

const Sidebar = ({ sidebarItems, addItems, loading }) => {
  return (
    <Nav className={styles['root']} vertical>
      {!loading &&
        sidebarItems.map(
          (item) =>
            !item.hidden && (
              <SidebarItem
                to={item.to}
                iconName={item.iconName}
                disabled={item.disabled}
                label={item.label}
                key={item.label}
              >
                {item.children}
              </SidebarItem>
            )
        )}
      {addItems
        ? addItems.map((item) => (
            <NavItem className={item.className} key={item.className}>
              {item.children}
            </NavItem>
          ))
        : null}
    </Nav>
  );
};

Sidebar.propTypes = {
  sidebarItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  addItems: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};
Sidebar.defaultProps = {
  addItems: [],
  loading: false,
};

export default Sidebar;
