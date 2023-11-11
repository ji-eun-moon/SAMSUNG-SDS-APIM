import useCategoryUsage from '@/hooks/useCategoryUsage';
import ChartFrame from '@/components/atoms/ChartFrame';
import DonutChart from '@/components/chart/DonutChart';
import { donutCategoryUsage } from '@/utils/chartData';
import PageLoading from '@/components/atoms/PageLoading';
import Refresh from '@/components/atoms/Refresh';

interface Props {
  categoryId: number;
  teamName: string;
  type: 'use' | 'provide';
}

function CategoryUsage({ categoryId, teamName, type }: Props) {
  const { categoryUsageData, refetchCategoryUsage, categoryUsageLoading } = useCategoryUsage({
    categoryId,
    teamName,
    type,
  });

  if (categoryUsageLoading || !categoryUsageData) {
    return <PageLoading />;
  }

  const chartData = donutCategoryUsage(categoryUsageData);
  const month = categoryUsageData[0].date;

  return (
    <div>
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

export default CategoryUsage;
