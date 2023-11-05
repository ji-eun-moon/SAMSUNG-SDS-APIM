import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import BothLayout from '@/components/templates/BothLayout';
import ApiSideBar from '@/components/organisms/ApiSideBar';
import { useRouter } from 'next/router';
import { useQuery, QueryClient } from 'react-query';
import { TCategoryList, IApiDetail } from '@/types/Api';
import useUserStore from '@/store/useUserStore';
import { getCategoryList, getUseCategoryList, getProvideCategoryList, getApiDetail } from '@/utils/axios/api';
import PageLoading from '@/components/atoms/PageLoading';
import GoBack from '@/components/atoms/GoBack';
import { dehydrate } from 'react-query/hydration';
import Copy from '@/components/atoms/Copy';
import ApiDetailLayout from '@/components/templates/ApiDetailLayout';
import ApiDescription from '@/components/organisms/api/ApiDescription';
import ApiEndpoint from '@/components/organisms/api/ApiEndpoint';
import ApiKeyTable from '@/components/organisms/api/ApiKeyTable';
import Editor from '@monaco-editor/react';
import { Code } from '@nextui-org/react';

type SSGProps = {
  apiId: number;
};

const ApiDetail: NextPage<SSGProps> = ({ apiId }: SSGProps) => {
  const router = useRouter();
  const { selectedTeam } = useUserStore();
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  const { data: useCategoryList } = useQuery<TCategoryList>(
    `useCategoryList ${selectedTeam}`,
    async () => {
      const result = await getUseCategoryList(selectedTeam || '');
      return result;
    },
    {
      enabled: Boolean(selectedTeam),
    },
  );
  const { data: provideCategoryList } = useQuery<TCategoryList>(
    `provideCategoryList ${selectedTeam}`,
    async () => {
      const result = await getProvideCategoryList(selectedTeam || '');
      return result;
    },
    {
      enabled: Boolean(selectedTeam),
    },
  );

  const { data: apiDetail } = useQuery<IApiDetail>(`apiDetail ${apiId}`, async () => {
    const result = await getApiDetail(apiId);
    return result;
  });

  if (!categoryList || !useCategoryList || !provideCategoryList || !apiDetail) {
    return <PageLoading />;
  }

  const editorOptions = {
    readOnly: true,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  };

  return (
    <BothLayout>
      <ApiSideBar
        useCategoryList={useCategoryList}
        provideCategoryList={provideCategoryList}
        openCategory={1}
        categoryList={categoryList}
        defaultSelectedKey={(router.query.defaultSelectedKey as string) || 'all'}
        openMyCategory={1}
      />
      <div>
        <GoBack label={apiDetail?.title} />
        <ApiDetailLayout>
          {/* Content */}
          <ApiDescription type="api" content={apiDetail.content} apiId={apiId} categoryId={apiDetail.categoryId} />
          {/* EndPoint */}
          <ApiEndpoint method={apiDetail.method} endpoint={apiDetail.endpoint} />

          {/* Headers */}
          <div className="flex flex-col gap-2">
            <div className="itdaText font-semibold text-base">Headers</div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bgItdaBlue text-white pl-3 py-2">이름</th>
                  <th className="bgItdaBlue text-white">설명</th>
                  <th className="bgItdaBlue text-white pr-3">필수</th>
                </tr>
              </thead>
              <tbody className="bg-white w-full">
                <tr className="text-center">
                  <td className="py-3">Authorization</td>
                  <td className="py-3">
                    <Code>Authorization: &#36;&#123;TEAM_KEY&#125;</Code>
                  </td>
                  <td className="pr-3 py-3">O</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end text-sm underline itdaSecondary cursor-pointer ">키 확인하기</div>
          </div>

          {/* Input - Parameters / Request Body */}
          <div className="flex flex-col gap-2">
            <div className="itdaText font-semibold text-base">
              {apiDetail.method === 'GET' ? 'Query Parameters' : 'Body'}
            </div>
            <ApiKeyTable type="input" keyList={JSON.parse(apiDetail.input)} />
          </div>

          <div className="flex flex-col gap-2">
            {/* Output */}
            <div className="itdaText font-semibold text-base">Body</div>
            <ApiKeyTable type="output" keyList={JSON.parse(apiDetail.output)} />
          </div>
          {/* Output Example */}
          <div className="border p-1 px-2 rounded-lg border-gray-300 bg-gray-100 p-2 px-4">
            <div className="flex justify-between">
              <div className="font-medium">응답 예시</div>
              <Copy copyText={JSON.stringify(JSON.parse(apiDetail.outputExample), null, 2)} />
            </div>
            <Editor
              height="500px"
              language="json"
              value={JSON.stringify(JSON.parse(apiDetail.outputExample), null, 2)}
              theme="vs-dark"
              options={editorOptions}
            />
          </div>
        </ApiDetailLayout>
      </div>
    </BothLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiId = Number(params?.apiId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`apiDetail ${apiId}`, () => getApiDetail(apiId));
  return {
    props: { dehydratedState: dehydrate(queryClient), apiId },
  };
};

export default ApiDetail;
