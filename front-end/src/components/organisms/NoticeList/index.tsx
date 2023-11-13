import React from 'react';
import Notice from '@/components/organisms/Notice';
import ShadowCard from '@/components/atoms/ShadowCard';
import SelectBox from '@/components/atoms/SelectBox';
import { Checkbox } from '@nextui-org/react';
import { ListProps, SendNoticeListProps, ReceiveNoticeListProps } from '@/types/props/NoticeListProps';

function NoticeList({
  type,
  selectDelete,
  checkedItems,
  setCheckedItems,
  onClickHandler,
  category,
  ...props
}: ListProps) {
  if (type === 'send') {
    const { noticeList } = props as SendNoticeListProps;
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
      const list = [...checkedItems];
      if (list.includes(id)) {
        const newList = list.filter((item: number) => item !== id);
        setCheckedItems(newList);
      } else {
        const newList = [...list, id];
        setCheckedItems(newList);
      }
    };

    return (
      <ShadowCard type="noShadow">
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
            <div className="flex items-center">
              <div className="itdaBlue mx-2">
                <button type="button" onClick={() => selectDelete(checkedItems)}>
                  선택삭제
                </button>
              </div>
              <div className="ml-2">
                <SelectBox
                  list={['전체보기', '안 읽은 쪽지', '읽은 쪽지']}
                  defaultSelect="전체보기"
                  width="w-36"
                  onChange={(item) => {
                    onClickHandler(item);
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
          {noticeList && noticeList.length !== 0 ? (
            noticeList?.map((notice, index) => (
              <div key={notice.noticeId}>
                <Notice
                  position="page"
                  type={type}
                  category={category}
                  noticeInfo={notice}
                  isSelected={checkedItems.includes(notice.noticeId)}
                  onCheckboxToggle={() => toggleCheckbox(notice.noticeId)}
                />
                {noticeList && index !== noticeList.length - 1 && <hr />}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-40">쪽지가 없습니다</div>
          )}
        </div>
      </ShadowCard>
    );
  }

  if (type === 'receive') {
    const { noticeList, selectRead } = props as ReceiveNoticeListProps;

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
      const list = [...checkedItems];
      if (list.includes(id)) {
        const newList = list.filter((item: number) => item !== id);
        setCheckedItems(newList);
      } else {
        const newList = [...list, id];
        setCheckedItems(newList);
      }
    };

    return (
      <ShadowCard type="noShadow">
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
            <div className="flex items-center">
              <div className="mr-2 itdaBlue">
                <button type="button" onClick={() => selectRead(checkedItems)}>
                  선택읽음
                </button>
              </div>
              <div className="itdaSecondary">&nbsp;|&nbsp;</div>
              <div className="itdaBlue mx-2">
                <button type="button" onClick={() => selectDelete(checkedItems)}>
                  선택삭제
                </button>
              </div>
              <div className="ml-2">
                <SelectBox
                  list={['전체보기', '안 읽은 쪽지', '읽은 쪽지']}
                  defaultSelect="전체보기"
                  width="w-36"
                  onChange={(item) => {
                    onClickHandler(item);
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
          {noticeList && noticeList.length !== 0 ? (
            noticeList?.map((notice, index) => (
              <div key={notice.noticeId}>
                <Notice
                  position="page"
                  type={type}
                  category={category}
                  noticeInfo={notice}
                  isSelected={checkedItems.includes(notice.noticeId)}
                  onCheckboxToggle={() => toggleCheckbox(notice.noticeId)}
                />
                {noticeList && index !== noticeList.length - 1 && <hr />}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-40">쪽지가 없습니다</div>
          )}
        </div>
      </ShadowCard>
    );
  }
}

export default NoticeList;
