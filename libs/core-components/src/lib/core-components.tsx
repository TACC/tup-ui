import styles from './core-components.module.css';

/* eslint-disable-next-line */
export interface CoreComponentsProps {}

export function CoreComponents(props: CoreComponentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CoreComponents!</h1>
    </div>
  );
}

export default CoreComponents;
