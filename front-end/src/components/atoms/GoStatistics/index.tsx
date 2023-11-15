import { TCategoryList } from '@/types/Api';
import useCategoryStatus from '@/hooks/useCategoryStatus';
import Link from 'next/link';
import styles from '@/components/organisms/UserMainBox/UserMainBox.module.scss';
import ShadowCard from '../ShadowCard';

interface BaseProps {
  type: 'category' | 'api';
  categoryId: number;
  useCategoryList: TCategoryList;
  provideCategoryList: TCategoryList;
}

interface ApiProps extends BaseProps {
  type: 'api';
  apiId: number;
}

function GoStatistics({ type, categoryId, useCategoryList, provideCategoryList, ...props }: BaseProps | ApiProps) {
  const { isProvided, isUsed } = useCategoryStatus({ categoryId, useCategoryList, provideCategoryList });

  // 카테고리 통계
  if (type === 'category') {
    if (isProvided && isUsed) {
      return (
        <div className="flex gap-2">
          <Link href={`/statistics/category/use/${categoryId}`}>
            <ShadowCard type="button">
              <div className={styles.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                  />
                </svg>
                <span>사용 통계</span>
              </div>
            </ShadowCard>
          </Link>
          <Link href={`/statistics/category/provide/${categoryId}`}>
            <ShadowCard type="button">
              <div className={styles.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                  />
                </svg>
                <span>제공 통계</span>
              </div>
            </ShadowCard>
          </Link>
        </div>
      );
    }
    if (isProvided) {
      return (
        <Link href={`/statistics/category/provide/${categoryId}`}>
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                />
              </svg>
              <span>제공 통계</span>
            </div>
          </ShadowCard>
        </Link>
      );
    }
    if (isUsed) {
      return (
        <Link href={`/statistics/category/use/${categoryId}`}>
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                />
              </svg>
              <span>사용 통계</span>
            </div>
          </ShadowCard>
        </Link>
      );
    }
  }

  // api 통계
  if (type === 'api') {
    const { apiId } = props as ApiProps;
    if (isProvided && isUsed) {
      return (
        <div className="flex gap-2">
          <Link href={`/statistics/api/use/${apiId}`}>
            <ShadowCard type="button">
              <div className={styles.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                  />
                </svg>
                <span>사용 통계</span>
              </div>
            </ShadowCard>
          </Link>
          <Link href={`/statistics/api/provide/${apiId}`}>
            <ShadowCard type="button">
              <div className={styles.shortcut}>
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                  />
                </svg>
                <span>사용 통계</span>
              </div>
            </ShadowCard>
          </Link>
        </div>
      );
    }
    if (isProvided) {
      return (
        <Link href={`/statistics/api/provide/${apiId}`}>
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                />
              </svg>
              <span>제공 통계</span>
            </div>
          </ShadowCard>
        </Link>
      );
    }
    if (isUsed) {
      return (
        <Link href={`/statistics/api/use/${apiId}`}>
          <ShadowCard type="button">
            <div className={styles.shortcut}>
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                />
              </svg>
              <span>사용 통계</span>
            </div>
          </ShadowCard>
        </Link>
      );
    }
  }
  return null;
}

export default GoStatistics;
