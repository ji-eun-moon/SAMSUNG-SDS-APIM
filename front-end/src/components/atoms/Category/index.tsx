import { CategoryProps } from '@/types/props/CategoryProps';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Category({ categoryName, categoryId, apiList, isOpen, my }: CategoryProps) {
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
                  currentPath === `/apis/detail/${item.apiId}` ? 'font-semibold' : ''
                }`}
              >
                {item.apiName}
              </div>
            </Link>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
}

export default Category;
