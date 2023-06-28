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
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
const formatDateTime = (datestring: string): string => {
  const date = new Date(datestring);
  return date.toISOString();
};

const ViewAllUpdates = () => (
  <a
    href={`/news/user-updates/`}
    className="c-button c-button--as-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    View All Updates
  </a>
);

const UserNews: React.FC = () => {
  const { data, isLoading } = useUserNews();
  const maxItems = 5;

  if (isLoading) return <LoadingSpinner />;
  return (
    <SectionTableWrapper
      header="User Updates"
      headerActions={<ViewAllUpdates />}
      contentShouldScroll
    >
      <div className={styles['news-list']}>
        {data &&
          data.slice(0, maxItems).map((newsItem) => (
            <article className={styles['news-list-item']} key={newsItem.ID}>
              <time
                className={styles['posted-date']}
                data-prefix="Posted:"
                dateTime={formatDateTime(newsItem.PostedDate)}
              >
                {formatDate(newsItem.PostedDate)}
              </time>
              <h3 className={styles['title']}>
                <a
                  href={`/news/user-updates/${newsItem.ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {newsItem.WebTitle.trim()}
                </a>
                {newsItem.Updates && (
                  <Pill type="updated" className={styles['status-pill']}>
                    Update
                  </Pill>
                )}
              </h3>
              <p className={styles['body']}>{newsItem.Content}</p>
            </article>
          ))}
      </div>
    </SectionTableWrapper>
  );
};

export default UserNews;
