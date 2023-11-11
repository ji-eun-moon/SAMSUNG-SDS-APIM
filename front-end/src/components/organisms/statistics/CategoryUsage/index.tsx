import useCategoryUsage from '@/hooks/useCategoryUsage';
import { useQuery } from 'react-query';
import ChartFrame from '@/components/atoms/ChartFrame';
import DonutChart from '@/components/chart/DonutChart';
import { donutCategoryUsage } from '@/utils/chartData';
import PageLoading from '@/components/atoms/PageLoading';
import Refresh from '@/components/atoms/Refresh';
import { getCategoryName } from '@/utils/axios/api';

interface Props {
  categoryId: number;
  teamName: string;
  type: 'use' | 'provide';
  use?: string;
}

function CategoryUsage({ categoryId, teamName, type, use }: Props) {
  const { categoryUsageData, refetchCategoryUsage, categoryUsageLoading } = useCategoryUsage({
    categoryId,
    teamName,
    type,
  });

  const { data: categoryName } = useQuery<string>(['teamInfo', categoryId], async () => {
    const result = await getCategoryName(categoryId);
    return result;
  });

  if (categoryUsageLoading || !categoryUsageData) {
    return <PageLoading />;
  }

  if (categoryName === undefined) {
    return null;
  }

  const chartData = donutCategoryUsage(categoryUsageData);
  const month = categoryUsageData[0].date;

  if (use === 'main') {
    return (
      <div className="w-full p-2">
        <div className="flex justify-end">
          <div className="text-sm itdaSecondary">
            {month} {categoryName}
          </div>
        </div>
        <div className="w-full h-full">
          <DonutChart title="총 사용량" chartData={chartData} use="main" />
        </div>
      </div>
    );
  }

  if (use === 'page') {
    return (
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <div>
            {month} 총 {type === 'use' ? '사용' : '제공'}량
          </div>
          <Refresh onClick={refetchCategoryUsage} />
        </div>
        <ChartFrame>
          <DonutChart title="총 사용량" chartData={chartData} />
        </ChartFrame>
      </div>
    );
  }
}

CategoryUsage.defaultProps = {
  use: 'page',
};

export default CategoryUsage;