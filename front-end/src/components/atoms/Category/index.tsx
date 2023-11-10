import { CategoryProps } from '@/types/props/CategoryProps';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useApiStore from '@/store/useApiStore';

function Category({ categoryName, categoryId, apiList, isOpen, my, type }: CategoryProps) {
  const { selectApi, selectedApi } = useApiStore((state) => state);

  const handleSelectApi = (name: string, id: number) => {
    selectApi(name, id);
  };

  const router = useRouter();
  const currentPath = router.asPath;
  const defaultKeys = isOpen ? [`${categoryId}`] : [];

  const defaultKey = () => {
    if (my) {
      return 'my';
    }
    return 'all';
  };

  return (
    <Accordion isCompact defaultExpandedKeys={defaultKeys} style={{ padding: '0px' }}>
      <AccordionItem
        key={`${categoryId}`}
        aria-label={`Accordion ${categoryId}`}
        title={<p className="itdaBlue font-medium">{categoryName}</p>}
      >
        {type === 'apis' && (
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
        )}
        {type === 'apis' ? (
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
        ) : (
          // 차트 API 리스트
          <ul>
            {apiList.map((item) => (
              <div key={item.apiId} aria-hidden onClick={() => handleSelectApi(item.apiName, item.apiId)}>
                <div
                  className={`my-2 itdaText cursor-pointer text-sm ${
                    selectedApi.id === item.apiId ? 'font-semibold' : ''
                  }`}
                >
                  {item.apiName}
                </div>
              </div>
            ))}
          </ul>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default Category;
