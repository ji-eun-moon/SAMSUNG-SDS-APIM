import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useQuery, QueryClient } from 'react-query';
import SideLayout from '@/components/templates/SideLayout';
import GoBack from '@/components/atoms/GoBack';
import NoticeCategory from '@/components/atoms/NoticeCategory';
import { getNoticeDetail } from '@/utils/axios/notice';
import { dehydrate } from 'react-query/hydration';
import { INoticeDetail } from '@/types/Notice';
import NoticeDetail from '@/components/organisms/NoticeDetail';

type SSGProps = {
  noticeId: number;
};

const ReceiveDetail: NextPage<SSGProps> = ({ noticeId }: SSGProps) => {
  const { data: noticeDetail } = useQuery<INoticeDetail>(`noticeDetail ${noticeId}`, async () => {
    const result = await getNoticeDetail(noticeId);
    return result;
  });

  if (noticeDetail === undefined) {
    return null;
  }

  return (
    <SideLayout>
      <div>
        <GoBack label="쪽지 상세보기" />
        <NoticeCategory select="receive" />
        <NoticeDetail notice={noticeDetail} />
      </div>
    </SideLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const noticeId = Number(params?.noticeId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`noticeDetail ${noticeId}`, () => getNoticeDetail(noticeId));
  return {
    props: { dehydratedState: dehydrate(queryClient), noticeId },
  };
};

export default ReceiveDetail;
