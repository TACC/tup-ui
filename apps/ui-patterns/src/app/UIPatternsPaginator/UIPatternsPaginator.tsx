import React, { useState, useCallback } from 'react';
import { Paginator } from '@tacc/core-components';

const UIPatternsPaginator: React.FC = () => {
  const [current, setCurrent] = useState(11);
  const callback = useCallback(
    (page: number) => {
      setCurrent(page);
    },
    [setCurrent]
  );
  return (
    <dl>
      <dt>Paginator with callbacks</dt>
      <dd>
        <Paginator pages={20} current={current} callback={callback} />
      </dd>
      <dt>Paginator with one page</dt>
      <dd>
        <Paginator pages={1} current={1} callback={() => null} />
      </dd>
      <dt>Paginator with fewer than 7 pages</dt>
      <dd>
        <Paginator pages={4} current={2} callback={() => null} />
      </dd>
      <dt>Paginator with current page near start</dt>
      <dd>
        <Paginator pages={20} current={3} callback={() => null} />
      </dd>
      <dt>Paginator with current page near end</dt>
      <dd>
        <Paginator pages={20} current={18} callback={() => null} />
      </dd>
      <dd>Paginator with a custom spread value</dd>
      <dt>
        <Paginator pages={20} current={11} spread={7} callback={() => null} />
      </dt>
    </dl>
  );
};

export default UIPatternsPaginator;
