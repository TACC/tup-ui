import React from 'react';
import { useUserNews } from '@tacc/tup-hooks';
import {
  LoadingSpinner,
  Pill,
  SectionTableWrapper,
} from '@tacc/core-components';
import styles from './UserNews.module.css';

const formatDate = (datestring: string): string => {
  const date = new Date(datestring);
  return `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`;
};

const UserNews: React.FC = () => {
  const { data, isLoading } = useUserNews();
  if (isLoading) return <LoadingSpinner />;
  return (
    <SectionTableWrapper header="User News" contentShouldScroll>
      <ul className={styles['news-list']}>
        {data &&
          data.slice(0, 12).map((newsItem) => (
            <li className={styles['news-list-item']}>
              <div className={styles['posted-date']}>
                <span>Posted {formatDate(newsItem.PostedDate)} </span>
                {newsItem.Updates && (
                  <Pill type="warning" className={styles['status-pill']}>
                    Updated
                  </Pill>
                )}
              </div>
              <div className={styles['title']}>
                <strong>{newsItem.WebTitle}</strong>
              </div>
              <div className={styles['body']}>{newsItem.Content}</div>
            </li>
          ))}
      </ul>
    </SectionTableWrapper>
  );
};

export default UserNews;
