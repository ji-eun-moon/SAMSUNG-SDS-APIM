import { CategoryProps } from '@/types/props/CategoryProps';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';

function Category({ categoryName, categoryId, apiList, isOpen }: CategoryProps) {
  const router = useRouter();
  const currentPath = router.asPath;
  const defaultKeys = isOpen ? [`${categoryId}`] : [];

  return (
    <Accordion isCompact defaultExpandedKeys={defaultKeys}>
      <AccordionItem
        key={`${categoryId}`}
        aria-label={`Accordion ${categoryId}`}
        title={<p className="itdaBlue font-medium">{categoryName}</p>}
      >
        <p
          onClick={() => router.push(`/apis/list?category=${categoryId}`)}
          aria-hidden
          className={`my-2 itdaText cursor-pointer text-sm ${
            currentPath === `/apis/list?category=${categoryId}` ? 'font-semibold' : ''
          }`}
        >
          전체 보기
        </p>
        <ul>
          {apiList.map((item) => (
            <li
              key={item.apiId}
              onClick={() => router.push(`/apis/${item.apiId}/detail`)}
              aria-hidden
              className={`my-2 itdaText cursor-pointer text-sm ${
                currentPath === `/apis/${item.apiId}/detail` ? 'font-semibold' : ''
              }`}
            >
              {item.apiName}
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
}

export default Category;
