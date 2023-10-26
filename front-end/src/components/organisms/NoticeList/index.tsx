import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Notice from '@/components/organisms/Notice';
import ShadowCard from '@/components/atoms/ShadowCard';
import Button from '@/components/atoms/Button';
import { Checkbox } from '@nextui-org/react';
import { NoticeListProps } from '@/types/props/NoticeListProps';

function NoticeList(props: NoticeListProps) {
  const router = useRouter();
  const { noticeList } = props;
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const onClick = (id: number) => {
    router.push(`/notice/${id}`);
  };

  const toggleAllCheckbox = (isChecked: boolean) => {
    if (isChecked) {
      const allNoticeIds = noticeList.map((notice) => notice.noticeId);
      setCheckedItems(allNoticeIds);
    } else {
      setCheckedItems([]);
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

  const selectDelete = () => {
    // checkedItems 삭제 처리
  };

  const selectRead = () => {
    // checkItems 읽음 처리
  };

  console.log(checkedItems.length === noticeList.length, 'checked값 확인');
  return (
    <ShadowCard type="small">
      <div className="p-3">
        <div className="pl-2 pb-4 flex justify-between">
          <div className="flex">
            <Checkbox
              color="default"
              isSelected={checkedItems.length === noticeList.length}
              className="mr-2"
              onChange={(e) => toggleAllCheckbox(e.target.checked)}
            />
            <div className="itdaText flex">전체선택</div>
          </div>
          <div className="flex">
            <div className="mr-2">
              <Button
                type="outlined"
                label="선택읽음"
                borderColor="bdItdaSecondary"
                textColor="itdaText"
                onButton={selectRead}
              />
            </div>
            <Button
              type="outlined"
              label="선택삭제"
              borderColor="bdItdaSecondary"
              textColor="itdaText"
              onButton={selectDelete}
            />
          </div>
        </div>
        <hr />
        {noticeList.map((notice, index) => (
          <div key={notice.noticeId}>
            <Notice
              noticeInfo={notice}
              onClick={() => onClick(notice.noticeId)}
              isSelected={checkedItems.includes(notice.noticeId)}
              onCheckboxToggle={() => toggleCheckbox(notice.noticeId)}
            />
            {index !== noticeList.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </ShadowCard>
  );
}

export default NoticeList;
