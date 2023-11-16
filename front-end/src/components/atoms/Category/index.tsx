import { CategoryProps } from '@/types/props/CategoryProps';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Category({ categoryName, categoryId, apiList, isOpen, my, type }: CategoryProps) {
  const router = useRouter();
  const currentPath = router.asPath;
  const defaultKeys = isOpen ? [`${categoryId}`] : [];

  const defaultKey = () => {
    if (my) {
      return 'my';
    }
    return 'all';
  };

  const renderApiList = () => {
    if (type === 'apis') {
      return (
        <div className="pl-2">
          <Link
            href={{
              pathname: `/category/${categoryId}`,
              query: { defaultSelectedKey: defaultKey() },
            }}
            as={`/category/${categoryId}`}
            className={`my-2 itdaText cursor-pointer text-sm hover:font-semibold flex gap-2 items-center ${
              currentPath === `/category/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/category/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            <svg
              className="w-4 h-4 text-gray-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"
              />
            </svg>
            <span>전체 보기</span>
          </Link>
          <ul>
            {apiList.map((item) => (
              <Link
                key={item.apiId}
                href={{
                  pathname: `/apis/detail/${item.apiId}`,
                  query: { defaultSelectedKey: defaultKey() },
                }}
                as={`/apis/detail/${item.apiId}`}
                onClick={(e) => {
                  if (currentPath === `/apis/detail/${item.apiId}`) {
                    e.preventDefault();
                  }
                }}
              >
                <div
                  className={`my-2 itdaText cursor-pointer text-sm hover:font-semibold ${
                    currentPath === `/apis/detail/${item.apiId}` || currentPath === `/apis/test/${item.apiId}`
                      ? 'font-semibold'
                      : ''
                  }`}
                >
                  {item.apiName}
                </div>
              </Link>
            ))}
          </ul>
        </div>
      );
    }
    if (type === 'use') {
      return (
        <div className="pl-2">
          <Link
            href={{
              pathname: `/statistics/category/use/${categoryId}`,
            }}
            className={`my-2 itdaText cursor-pointer text-sm hover:font-semibold  flex gap-2 ${
              currentPath === `/statistics/category/use/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/statistics/category/use/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            <svg
              className="w-4 h-4 text-gray-600 dark:text-white"
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
            <span>카테고리 통계</span>{' '}
          </Link>
          <ul>
            {apiList.map((item) => (
              <Link
                key={item.apiId}
                aria-hidden
                href={{
                  pathname: `/statistics/api/use/${item.apiId}`,
                }}
                onClick={(e) => {
                  if (currentPath === `/statistics/api/use/${item.apiId}`) {
                    e.preventDefault();
                  }
                }}
              >
                <div
                  className={`my-2 itdaText cursor-pointer text-sm hover:font-semibold ${
                    currentPath === `/statistics/api/use/${item.apiId}` ? 'font-semibold' : ''
                  }`}
                >
                  {item.apiName}
                </div>
              </Link>
            ))}
          </ul>
        </div>
      );
    }
    if (type === 'provide') {
      return (
        <div className="pl-2">
          <Link
            href={{
              pathname: `/statistics/category/provide/${categoryId}`,
            }}
            className={`my-2 itdaText cursor-pointer text-sm hover:font-semibold  flex gap-2  ${
              currentPath === `/statistics/category/provide/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/statistics/category/provide/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            <svg
              className="w-4 h-4 text-gray-600 dark:text-white"
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
            <span>카테고리 통계</span>{' '}
          </Link>
          <ul>
            {apiList.map((item) => (
              <div
                key={item.apiId}
                aria-hidden
                onClick={() => {
                  if (currentPath !== `/statistics/api/provide/${item.apiId}`) {
                    router.push(`/statistics/api/provide/${item.apiId}`);
                  }
                }}
              >
                <div
                  className={`my-2 itdaText cursor-pointer text-sm ${
                    currentPath === `/statistics/api/provide/${item.apiId}` ? 'font-semibold' : ''
                  }`}
                >
                  {item.apiName}
                </div>
              </div>
            ))}
          </ul>
        </div>
      );
    }
    if (type === 'admin') {
      return (
        <div className="pl-2">
          <Link
            href={{
              pathname: `/statistics/category/admin/${categoryId}`,
            }}
            className={`my-2 itdaText cursor-pointer text-sm hover:font-semibold flex gap-2 ${
              currentPath === `/statistics/category/admin/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/statistics/category/admin/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            <svg
              className="w-4 h-4 text-gray-600 dark:text-white"
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
            <span>카테고리 통계</span>
          </Link>
          <ul>
            {apiList.map((item) => (
              <div
                key={item.apiId}
                aria-hidden
                onClick={() => {
                  if (currentPath !== `/statistics/api/admin/${item.apiId}`) {
                    router.push(`/statistics/api/admin/${item.apiId}`);
                  }
                }}
              >
                <div
                  className={`my-2 itdaText cursor-pointer text-sm hover:font-semibold ${
                    currentPath === `/statistics/api/admin/${item.apiId}` ? 'font-semibold' : ''
                  }`}
                >
                  {item.apiName}
                </div>
              </div>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <Accordion isCompact defaultExpandedKeys={defaultKeys} style={{ padding: '0px' }}>
      <AccordionItem
        key={`${categoryId}`}
        aria-label={`Accordion ${categoryId}`}
        title={<p className="itdaBlue font-medium">{categoryName}</p>}
      >
        {renderApiList()}
      </AccordionItem>
    </Accordion>
  );
}

export default Category;
