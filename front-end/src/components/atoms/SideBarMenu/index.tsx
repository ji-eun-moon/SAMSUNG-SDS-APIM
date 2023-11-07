import { Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { SideBarMenuProps } from '@/types/props/SideBarProps';

/**
 * 필터링이 필요한 페이지의 사이드 바 메뉴
 *
 */

function SideBarMenu({ title, conditionList }: SideBarMenuProps) {
  const router = useRouter();
  const currentPath = router.asPath;
  const decodedPath = decodeURIComponent(currentPath);

  const defaultKeys = ['1'];

  return (
    <Accordion isCompact defaultExpandedKeys={defaultKeys}>
      <AccordionItem key="1" aria-label="Accordion 1" title={<p className="itdaBlue font-medium">{title}</p>}>
        <ul>
          {conditionList.map((condition) => (
            <li
              key={condition.conditionId}
              onClick={() => {
                router.push(`${condition.url}`);
              }}
              aria-hidden
              className={`my-2 pl-2 itdaText cursor-pointer ${
                decodedPath === `${condition.url}` ||
                decodedPath.includes(`${condition.url}?query=`) ||
                decodedPath.includes(`${condition.url}&query=`)
                  ? 'font-semibold'
                  : ''
              }`}
            >
              {condition.title}
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
}

export default SideBarMenu;
