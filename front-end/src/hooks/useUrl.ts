import useMyApi from './useMyApi';
import useApi from './useApi';

function useUrl(teamName: string) {
  const { firstUseCategoryId, firstProvideCategoryId } = useMyApi(teamName);
  const { firstCategoryId } = useApi();

  const userStatisticsUrl = `/statistics/category/use/${firstUseCategoryId}`;
  const userProvideStatisticsUrl = `/statistics/category/provide/${firstProvideCategoryId}`;
  const adminStatisticsUrl = `/statistics/category/admin/${firstCategoryId}`;
  const categoryUrl = `/category/${firstCategoryId}`;

  return { userStatisticsUrl, adminStatisticsUrl, categoryUrl, userProvideStatisticsUrl };
}

export default useUrl;
