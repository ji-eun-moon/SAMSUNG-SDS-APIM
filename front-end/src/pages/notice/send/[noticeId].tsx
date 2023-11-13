import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useQuery, QueryClient } from 'react-query';
import TopLayout from '@/components/templates/TopLayout';
import GoBack from '@/components/atoms/GoBack';
import NoticeCategory from '@/components/atoms/NoticeCategory';
import { getSendNoticeDetail } from '@/utils/axios/notice';
import { dehydrate } from 'react-query/hydration';
import { ISendNoticeDetail } from '@/types/Notice';
import NoticeDetail from '@/components/organisms/NoticeDetail';
import styles from '@/components/templates/TopLayout/TopLayout.module.scss';

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
    <TopLayout>
      <div className={styles.topPageContainer}>
        <div style={{ margin: '0 200px' }}>
          <GoBack label="쪽지 상세보기" />
          <NoticeCategory select="send" />
          <NoticeDetail type="send" notice={sendDetail} />
        </div>
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
  await queryClient.prefetchQuery(`noticeDetail ${noticeId}`, () => getSendNoticeDetail(noticeId));
  return {
    props: { dehydratedState: dehydrate(queryClient), noticeId },
  };
};

export default SendDetail;
