import React, { useState } from 'react';
import Notice from '@/components/organisms/Notice';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledButton from '@/components/atoms/StyledButton';
import { Checkbox } from '@nextui-org/react';
import { NoticeListProps } from '@/types/props/NoticeListProps';

function NoticeList(props: NoticeListProps) {
  const { noticeList, selectDelete, selectRead } = props;
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleAllCheckbox = async (isChecked: boolean) => {
    const allNoticeIds = noticeList?.map((notice) => notice.noticeId);
    if (allNoticeIds) {
      if (isChecked) {
        await setCheckedItems(allNoticeIds);
      } else {
        setCheckedItems([]);
      }
    }
  };

  const toggleCheckbox = (id: number) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="ml-8">
      <ShadowCard type="big">
        <div className="py-1 px-3">
          <div className="pl-2 pb-4 flex justify-between">
            <div className="flex items-center">
              <Checkbox
                color="default"
                isSelected={checkedItems.length === noticeList?.length}
                className="mr-2 flex"
                onChange={(e) => toggleAllCheckbox(e.target.checked)}
              />
              <div className="itdaText flex">전체선택</div>
            </div>
            <div className="flex">
              <div className="mr-2">
                <StyledButton
                  variant="bordered"
                  label="선택읽음"
                  onClick={() => selectRead(checkedItems)}
                  radius="full"
                  type="button"
                />
              </div>
              <StyledButton
                variant="bordered"
                label="선택삭제"
                onClick={() => selectDelete(checkedItems)}
                radius="full"
                type="button"
              />
            </div>
          </div>
          <hr />
          {noticeList?.map((notice, index) => (
            <div key={notice.noticeId}>
              <Notice
                noticeInfo={notice}
                isSelected={checkedItems.includes(notice.noticeId)}
                onCheckboxToggle={() => toggleCheckbox(notice.noticeId)}
              />
              {index !== noticeList?.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </ShadowCard>
    </div>
  );
}

export default NoticeList;
