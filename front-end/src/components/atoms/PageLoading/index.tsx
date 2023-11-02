import { Spinner } from '@nextui-org/react';
import styles from './PageLoading.module.scss';

function PageLoading() {
  return (
    <div className={styles.overlay}>
      <Spinner size="lg" color="primary" />
    </div>
  );
}

export default PageLoading;
