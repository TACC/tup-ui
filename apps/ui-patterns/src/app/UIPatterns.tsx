import React from 'react';
import { Section } from '@tacc/core-components';
/*

import UIPatternsSection from './UIPatternsSection';

import UIPatternsDropdownSelector from './UIPatternsDropdownSelector';
import UIPatternsPill from './UIPatternsPill';
import UIPatternsShowMore from './UIPatternsShowMore';

import UIPatternsSidebar from './UIPatternsSidebar';
*/
import UIPatternsDescriptionList from './UIPatternsDescriptionList';
import UIPatternsButton from './UIPatternsButton';
import UIPatternsMessage from './UIPatternsMessage';
import UIPatternsPaginator from './UIPatternsPaginator';
import styles from './UIPatterns.module.scss';

const UIPatterns: React.FC = () => {
  return (
    <Section
      introMessageName="UI"
      className={styles.container}
      header="UI Patterns"
      content={
        <>
          <div className={styles['list-item']}>
            <h6>Button</h6>
            <UIPatternsButton />
          </div>
          <div className={styles['list-item']}>
            <h6>DescriptionList</h6>
            <UIPatternsDescriptionList />
          </div>
          <div className={styles['list-item']}>
            <h6>Message &amp; Notification</h6>
            <UIPatternsMessage />
          </div>
          <div className={styles['list-item']}>
            <h6>Paginator</h6>
            <UIPatternsPaginator />
          </div>
          {/*
          <div className={styles['list-item']}>
            <h6>Section</h6>
            <UIPatternsSection />
          </div>

          <div className={styles['list-item']}>
            <h6>DropdownSelector</h6>
            <UIPatternsDropdownSelector />
          </div>

          <div className={styles['list-item']}>
            <h6>Pills</h6>
            <UIPatternsPill />
          </div>
          <div className={styles['list-item']}>
            <h6>Show More</h6>
            <UIPatternsShowMore />
          </div>

          <div className={styles['list-item']}>
            <h6>Sidebar</h6>
            <UIPatternsSidebar />
          </div>
          */}

        </>
      }
      contentLayoutName="oneColumn"
      contentShouldScroll
    />
  );
}

export default UIPatterns;
