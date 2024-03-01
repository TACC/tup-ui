import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  useSoftware,
  SoftwareResult,
  useSoftwareDetail,
  SoftwareResource,
} from '@tacc/tup-hooks';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  Button,
  Icon,
  InlineMessage,
  LoadingSpinner,
} from '@tacc/core-components';
import { EmptyTablePlaceholder } from '../utils';

import styles from './SoftwareTable.module.css';

const SoftwareModal: React.FC<{ pkg: SoftwareResult }> = ({ pkg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSoftwareDetail(pkg.package, isOpen);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [resource, setResource] = useState(data?.resources[0]);
  useEffect(() => setResource(data?.resources[0]), [data]);

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  return (
    <>
      <Button type="link" onClick={() => toggle()}>
        Version Documentation
      </Button>
      <Modal
        centered
        isOpen={isOpen}
        toggle={toggle}
        size="lg"
        id="software-table-modal"
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          {pkg.package}
        </ModalHeader>
        <ModalBody className={styles['modal-body']}>
          <p className={styles['package-desc']}>{data?.description}</p>
          <Nav tabs>
            {data?.resources.map((r) => {
              const isActive = r.name === resource?.name;
              return (
                <NavItem key={r.name}>
                  <NavLink
                    href="#" // So cursor becomes pointer on hover
                    className={isActive ? 'active' : ''}
                    onClick={() => setResource(r)}
                  >
                    {r.name}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          {resource && <ResourceView resource={resource}></ResourceView>}
        </ModalBody>
      </Modal>
    </>
  );
};

const ResourceView: React.FC<{ resource: SoftwareResource }> = ({
  resource,
}) => {
  const [currentVersion, setCurrentVersion] = useState(resource.versions[0]);
  useLayoutEffect(() => setCurrentVersion(resource.versions[0]), [resource]);
  return (
    <section className={styles.resource}>
      <nav>
        <p className={styles['resource-title']}>Software Version</p>
        <ul>
          {resource.versions.map((v) => {
            const isActive = v.id === currentVersion?.id;
            return (
              <li key={v.id}>
                <button
                  className={`
                    ${styles['resource-version']}
                    ${isActive ? styles['is-active'] : ''}
                  `}
                  onClick={() => setCurrentVersion(v)}
                >
                  {v.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <article>
        <h3>{resource.name}</h3>
        <pre>{currentVersion.description}</pre>
      </article>
    </section>
  );
};

const SoftwareTable: React.FC = () => {
  const { data, isLoading, error } = useSoftware();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterSystem, setFilterSystem] = useState('');

  const sortedData = useMemo(
    () =>
      data?.sort((a, b) =>
        a.package.toUpperCase() < b.package.toUpperCase() ? -1 : 1
      ),
    [data]
  );

  const filteredData = sortedData
    ?.filter((pkg) => pkg.package.includes(searchTerm))
    ?.filter((pkg) => !filterTopic || pkg.topic.includes(filterTopic))
    ?.filter((pkg) => !filterSystem || pkg.resources.includes(filterSystem));

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <InlineMessage type="warn">Unable to retrieve software.</InlineMessage>
    );
  }
  return (
    <>
      <form className={styles.form}>
        <label className={styles['search-field']}>
          <Icon
            name="search"
            size="md"
            label="Search"
            className={styles.icon}
          />
          <input
            type="search"
            placeholder="Search for package"
            autoComplete="off"
            minLength={3}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label className={styles['filter-field']}>
          <span>Topic</span>
          <select onChange={(e) => setFilterTopic(e.target.value)}>
            <option value="">any</option>
            <option>application</option>
            <option>chemistry</option>
            <option>computational biology</option>
            <option>developer support</option>
            <option>genomics</option>
            <option>graphics</option>
            <option>library</option>
            <option>mathematics</option>
            <option>performance analysis</option>
            <option>runtime support</option>
            <option>software</option>
            <option>scientific</option>
            <option>statistics</option>
            <option>system</option>
            <option>tools</option>
            <option>utilities</option>
            <option>utility</option>
            <option>visualization</option>
          </select>
        </label>
        <label className={styles['filter-field']}>
          <span>System</span>
          <select onChange={(e) => setFilterSystem(e.target.value)}>
            <option value="">any</option>
            <option>Frontera</option>
            <option>Lonestar6</option>
            <option>Stampede2</option>
          </select>
        </label>
      </form>
      <div className={`${styles['table-wrap']}`}>
        <table className="o-fixed-header-table">
          <thead>
            <tr>
              <th>Package</th>
              <th>Topic</th>
              <th>System</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!filteredData?.length && (
              <tr>
                <td colSpan={4}>
                  <EmptyTablePlaceholder>
                    No matching software found.
                  </EmptyTablePlaceholder>
                </td>
              </tr>
            )}
            {filteredData?.map((pkg) => (
              <tr key={pkg.package}>
                <td>{pkg.package}</td>
                <td>{pkg.topic}</td>
                <td>{pkg.resources.join(', ')}</td>
                <td>
                  <SoftwareModal pkg={pkg} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SoftwareTable;
