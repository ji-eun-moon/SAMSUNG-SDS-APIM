import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import GoBack from '@/components/atoms/GoBack';
import { getReceiveNoticeDetail } from '@/utils/axios/notice';
import { dehydrate } from 'react-query/hydration';
import { INoticeDetail } from '@/types/Notice';
import NoticeDetail from '@/components/organisms/NoticeDetail';
// import styles from '@/components/templates/TopLayout/TopLayout.module.scss';
import BothLayout from '@/components/templates/BothLayout';
import NoticeSideBar from '@/components/organisms/NoticeSideBar';

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
    <BothLayout>
      <NoticeSideBar />
      <div>
        <div className="mb-4">
          <GoBack label="쪽지 상세보기" />
        </div>
        {/* <NoticeCategory select="receive" /> */}
        <NoticeDetail type="receive" notice={noticeDetail} />
      </div>
    </BothLayout>
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
