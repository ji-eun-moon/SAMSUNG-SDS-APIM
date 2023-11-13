import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import TopLayout from '@/components/templates/TopLayout';
import GoBack from '@/components/atoms/GoBack';
import NoticeCategory from '@/components/atoms/NoticeCategory';
import { getReceiveNoticeDetail } from '@/utils/axios/notice';
import { dehydrate } from 'react-query/hydration';
import { INoticeDetail } from '@/types/Notice';
import NoticeDetail from '@/components/organisms/NoticeDetail';

type SSGProps = {
  noticeId: number;
};

const ReceiveDetail: NextPage<SSGProps> = ({ noticeId }: SSGProps) => {
  const queryClient = useQueryClient();
  const { data: noticeDetail } = useQuery<INoticeDetail>(`noticeDetail ${noticeId}`, async () => {
    const result = await getReceiveNoticeDetail(noticeId);
    queryClient.invalidateQueries('noticeCnt');
    return result;
  });

  if (noticeDetail === undefined) {
    return null;
  }

  return (
    <TopLayout>
      <div style={{ margin: '30px 200px' }}>
        <GoBack label="쪽지 상세보기" />
        <NoticeCategory select="receive" />
        <NoticeDetail type="receive" notice={noticeDetail} />
      </div>
    </TopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const noticeId = Number(params?.noticeId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`noticeDetail ${noticeId}`, () => getReceiveNoticeDetail(noticeId));
  return {
    props: { dehydratedState: dehydrate(queryClient), noticeId },
  };
};

export default ReceiveDetail;
