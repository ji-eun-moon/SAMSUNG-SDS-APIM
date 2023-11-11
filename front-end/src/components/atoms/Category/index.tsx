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
          >
            카테고리 통계
          </Link>
          <ul>
            {apiList.map((item) => (
              <div key={item.apiId} aria-hidden onClick={() => router.push(`/statistics/api/provide/${item.apiId}`)}>
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
