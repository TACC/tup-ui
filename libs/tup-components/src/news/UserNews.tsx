import React from 'react';
import { useUserNews } from '@tacc/tup-hooks';
import {
  LoadingSpinner,
  Pill,
  SectionTableWrapper,
  Button,
  Icon,
} from '@tacc/core-components';
import styles from './UserNews.module.css';

const formatDate = (datestring: string): string => {
  const date = new Date(datestring);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
const ViewAllUpdates = () => (
  <a href={`/news/user-updates/`} target="_blank" rel="noopener noreferrer">
    <Button type="link" iconNameBefore="icon icon-push-right">
      {' '}
      View All Updates
    </Button>
  </a>
);

const UserNews: React.FC = () => {
  const { data, isLoading } = useUserNews();
  if (isLoading) return <LoadingSpinner />;
  return (
    <SectionTableWrapper
      header="User Updates"
      headerActions={<ViewAllUpdates />}
      contentShouldScroll
    >
      <ul className={styles['news-list']}>
        {data &&
          data.slice(0, 12).map((newsItem) => (
            <li className={styles['news-list-item']} key={newsItem.ID}>
              <div className={styles['posted-date']}>
                <span>Posted {formatDate(newsItem.PostedDate)} </span>
                {newsItem.Updates && (
                  <Pill type="warning" className={styles['status-pill']}>
                    Updated
                  </Pill>
                )}
              </div>
              <div className={styles['title']}>
                <a href={`/news/user-updates/${newsItem.ID}`} target="_blank" rel="noopener noreferrer">
                  {newsItem.WebTitle}
                </a>
              </div>
              <div className={styles['body']}>{newsItem.Content}</div>
            </li>
          ))}
      </ul>
    </SectionTableWrapper>
  );
};

export default UserNews;
