import React, { useEffect, useState } from 'react';
import { TApiInputList, IApiTestInfo } from '@/types/Api';
import useTestStore from '@/store/useTestStore';
import useApiTest from '@/hooks/useApiTest';
import StyledButton from '@/components/atoms/StyledButton';

interface Props {
  apiTestInfo: IApiTestInfo;
}

function ApiTestForm({ apiTestInfo }: Props) {
  const [data, setData] = useState<TApiInputList>([]);
  const { params, setParam, resetParams, setLoading } = useTestStore();
  const { apiTest } = useApiTest();

  useEffect(() => {
    try {
      if (apiTestInfo) {
        const parsedData = JSON.parse(apiTestInfo.input);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Invalid JSON data:', error);
    }
    // 언마운트 될 때 스토어 값 초기화
    return () => {
      resetParams();
    };
  }, [apiTestInfo, resetParams]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    apiTest({ url: apiTestInfo.endpoint, params, accessToken: apiTestInfo.categoryToken, method: 'GET' });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3">
        <div className="itdaText font-semibold text-base">
          {apiTestInfo.method === 'GET' ? 'Query Parameters' : 'Request Body'}
        </div>
        <div className="bg-white border">
          {data.map((list) => (
            <div key={list.name} className="grid grid-cols-5">
              <div className="flex border-b p-2 pl-5 items-center col-span-1">
                <div>{list.name}</div>
                <div className="text-red-600">{list.required === 'true' ? '*' : ''}</div>
              </div>
              <div className="flex border-b p-2 items-center col-span-1">{list.type}</div>
              <div className="border-b p-2 pr-5 col-span-3">
                <div className="inputContainer">
                  <input
                    placeholder={list.description}
                    value={params[list.name] || ''}
                    onChange={(e) => setParam(list.name, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-fit self-center my-2">
          <StyledButton type="submit" label="TEST" variant="solid" radius="lg" />
        </div>
      </div>
    </form>
  );
}

export default ApiTestForm;
