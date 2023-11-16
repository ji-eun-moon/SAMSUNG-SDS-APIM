import axios, { AxiosError } from 'axios';
import useTestStore from '@/store/useTestStore';

interface ITest {
  url: string | undefined;
  params: Record<string, string>;
  accessToken: string;
  method: string | undefined;
}
const useApiTest = () => {
  const { setTestResponse, setStatus, setLoading, setTestRequest } = useTestStore();

  const extractStatus = (input: string): number => {
    try {
      const match = input.match(/"status":(\d+)/);
      return match ? parseInt(match[1], 10) : 200;
    } catch {
      return 200;
    }
  };

  const apiTest = async ({ url, params, accessToken, method }: ITest) => {
    try {
      let response;
      if (method === 'GET') {
        response = await axios({
          method: 'GET',
          url,
          params,
          headers: {
            Authorization: accessToken,
          },
        });
      } else {
        response = await axios({
          method: 'POST',
          url,
          data: params,
          headers: {
            Authorization: accessToken,
          },
        });
      }
      response.config.headers.Authorization = '{YOUR_TEAM_KEY}';
      setTestRequest(JSON.stringify(response.config));
      setTestResponse(JSON.stringify(response.data));
      if (typeof response.data === 'string') {
        setStatus(extractStatus(response.data));
      } else {
        setStatus(response.status);
      }
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError && axiosError.response) {
          axiosError.response.config.headers.Authorization = '{YOUR_TEAM_KEY}';
          setTestRequest(JSON.stringify(axiosError.response?.config));
        }
        setTestResponse(JSON.stringify(axiosError));
        setStatus(axiosError.response?.status || 500);
        setLoading(false);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
    return false;
  };
  return { apiTest };
};

export default useApiTest;
