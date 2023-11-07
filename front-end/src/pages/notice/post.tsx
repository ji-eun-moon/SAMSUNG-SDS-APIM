import React from 'react';
import SideLayout from '@/components/templates/SideLayout';
import GoBack from '@/components/atoms/GoBack';
import NoticeSendBox from '@/components/organisms/NoticeSendBox';

function PostNotice() {
  return (
    <SideLayout>
      <div>
        <GoBack label="쪽지 보내기" />
        <NoticeSendBox />
      </div>
    </SideLayout>
  );
}

export default PostNotice;
