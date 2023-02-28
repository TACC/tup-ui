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
import { Button } from '@tacc/core-components';

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
      <Button onClick={() => toggle()}>
        <strong>Details</strong>
      </Button>
      <Modal centered isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle} close={closeBtn}>
          <div>{pkg.package}</div>
          <div>{data?.description}</div>
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            {data?.resources.map((resource) => (
              <NavItem key={resource.name}>
                <NavLink onClick={() => setResource(resource)}>
                  {resource.name}
                </NavLink>
              </NavItem>
            ))}
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
  const [currentVersion, setcurrentVersion] = useState(resource.versions[0]);
  useLayoutEffect(() => setcurrentVersion(resource.versions[0]), [resource]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div> {resource.name}</div>
      <span>
        {resource.versions.map((v) => (
          <Button
            key={v.id}
            type={v.id === currentVersion?.id ? 'active' : 'secondary'}
            onClick={() => setcurrentVersion(v)}
          >
            {v.name}
          </Button>
        ))}
      </span>
      <span style={{ whiteSpace: 'pre-line' }}>
        {currentVersion.description}
      </span>
    </div>
  );
};

const SoftwareTable: React.FC = () => {
  const { data } = useSoftware();
  const sortedData = useMemo(
    () =>
      data?.sort((a, b) =>
        a.package.toUpperCase() < b.package.toUpperCase() ? -1 : 1
      ),
    [data]
  );
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div
        style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}
      >
        <strong style={{ display: 'flex', alignItems: 'center' }}>
          <span>Search:&nbsp;</span>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ float: 'right' }}
          ></input>
        </strong>
      </div>
      <div style={{ height: '70vh', overflow: 'auto' }}>
        <table
          className="o-fixed-header-table"
          style={{ width: '100%', overflow: 'auto' }}
        >
          <thead>
            <tr>
              <th>Package</th>
              <th>Topic</th>
              <th>Resources</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedData
              ?.filter((pkg) => pkg.package.includes(searchTerm))
              .map((pkg) => (
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
