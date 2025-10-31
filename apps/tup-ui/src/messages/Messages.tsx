import { SectionMessage } from '@tacc/core-components';
import styles from './Messages.module.css';

export const ProjectsMessage = () => {
  return (
    <SectionMessage
      type="error"
      className={styles['message']}
    >
      Project Maintenance is scheduled for{' '}
      <time>Tues Nov 4, 9AM - 1PM CT</time>. You will be unable to
      manage your project users during this time. See{' '}
      <a
        href="https://tacc.utexas.edu/news/user-updates/107601/"
        rel="noreferrer"
        target="_blank"
      >
        tacc.utexas.edu/news/user-updates/107601
      </a>
      .
    </SectionMessage>
  );
}
