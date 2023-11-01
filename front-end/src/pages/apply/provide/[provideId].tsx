import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IProvide, IProvideDetail } from '@/types/Apply';
import { getProvideApplyDetail } from '@/utils/axios/apply';
import ApplySideBar from '@/components/organisms/ApplySideBar';
import BothLayout from '@/components/templates/BothLayout';
import GoBack from '@/components/atoms/GoBack';
import RowTable from '@/components/atoms/RowTable';
import style from '@/styles/ProvideDetail.module.scss';

interface IProvideId extends IProvide, IProvideDetail {}

type SSGProps = {
  details: IProvideId[];
  isUser: boolean;
};

const ProvideDetail: NextPage<SSGProps> = ({ details, isUser }: SSGProps) => {
  const headerContent = ['서버명', '서버설명', '신청팀', '담당자', '서버주소'];
  const bodyContent = details.map((detail) => ({
    서버명: detail.serverName,
    서버설명: detail.description,
    신청팀: detail.teamName,
    담당자: detail.providerName,
    서버주소: detail.apiDocs,
  }));

  return (
    <BothLayout>
      <div>Top Nav 들어갈 부분</div>
      <ApplySideBar isUser={isUser} />
      <div className={`${style.listContainer}`}>
        <GoBack label="API 제공 신청 내역" />
        <RowTable title="신청 정보" headerContent={headerContent} bodyContent={bodyContent} />
      </div>
    </BothLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const details = await getProvideApplyDetail(48);
  const paths =
    details && details.map((detail: IProvideId) => ({ params: { provideId: detail.provideId.toString() } }));

  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps<SSGProps> = async ({ params }) => {
  const details = await getProvideApplyDetail(48);
  const detail = details.find((item: IProvideId) => item.provideId === Number(params?.provideId));
  const isUser = true;

  if (!detail) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      details,
      isUser,
    },
    revalidate: 60,
  };
};

export default ProvideDetail;
