import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useQuery, QueryClient } from 'react-query';
import GoBack from '@/components/atoms/GoBack';
import { getSendNoticeDetail } from '@/utils/axios/notice';
import { dehydrate } from 'react-query/hydration';
import { ISendNoticeDetail } from '@/types/Notice';
import NoticeDetail from '@/components/organisms/NoticeDetail';
// import styles from '@/components/templates/TopLayout/TopLayout.module.scss';
import BothLayout from '@/components/templates/BothLayout';
import NoticeSideBar from '@/components/organisms/NoticeSideBar';

type SSGProps = {
  noticeId: number;
};

const SendDetail: NextPage<SSGProps> = ({ noticeId }: SSGProps) => {
  const { data: sendDetail } = useQuery<ISendNoticeDetail>(`sendDetail ${noticeId}`, async () => {
    const result = await getSendNoticeDetail(noticeId);
    return result;
  });

  if (sendDetail === undefined) {
    return null;
  }

  return (
    <BothLayout>
      <NoticeSideBar />
      <div>
        <div className="mb-4">
          <GoBack label="쪽지 상세보기" />
        </div>
        <NoticeDetail type="send" notice={sendDetail} />
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
  await queryClient.prefetchQuery(`noticeDetail ${noticeId}`, () => getSendNoticeDetail(noticeId));
  return {
    props: { dehydratedState: dehydrate(queryClient), noticeId },
  };
};

export default SendDetail;
