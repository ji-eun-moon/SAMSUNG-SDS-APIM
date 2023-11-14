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
        <div>
          <Link
            href={{
              pathname: `/category/${categoryId}`,
              query: { defaultSelectedKey: defaultKey() },
            }}
            as={`/category/${categoryId}`}
            className={`my-2 itdaText cursor-pointer text-sm ${
              currentPath === `/category/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/category/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            전체 보기
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
                  className={`my-2 itdaText cursor-pointer text-sm ${
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
        <div>
          <Link
            href={{
              pathname: `/statistics/category/use/${categoryId}`,
            }}
            className={`my-2 itdaText cursor-pointer text-sm ${
              currentPath === `/statistics/category/use/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/statistics/category/use/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            카테고리 통계
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
                  className={`my-2 itdaText cursor-pointer text-sm ${
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
        <div>
          <Link
            href={{
              pathname: `/statistics/category/provide/${categoryId}`,
            }}
            className={`my-2 itdaText cursor-pointer text-sm ${
              currentPath === `/statistics/category/provide/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/statistics/category/provide/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            카테고리 통계
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
        <div>
          <Link
            href={{
              pathname: `/statistics/category/admin/${categoryId}`,
            }}
            className={`my-2 itdaText cursor-pointer text-sm ${
              currentPath === `/statistics/category/admin/${categoryId}` ? 'font-semibold' : ''
            }`}
            onClick={(e) => {
              if (currentPath === `/statistics/category/admin/${categoryId}`) {
                e.preventDefault();
              }
            }}
          >
            카테고리 통계
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
                  className={`my-2 itdaText cursor-pointer text-sm ${
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
