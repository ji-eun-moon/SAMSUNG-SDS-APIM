import useMyApi from './useMyApi';
import useApi from './useApi';

function useUrl(teamName: string) {
  const { firstUseCategoryId } = useMyApi(teamName);
  const { firstCategoryId } = useApi();

  const userStatisticsUrl = `/statistics/category/use/${firstUseCategoryId}`;
  const adminStatisticsUrl = `/statistics/category/admin/${firstCategoryId}`;
  const categoryUrl = `/category/${firstCategoryId}`;

  return { userStatisticsUrl, adminStatisticsUrl, categoryUrl };
}

export default useUrl;
