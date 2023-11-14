import useCategoryUsage from '@/hooks/useCategoryUsage';
import { useQuery } from 'react-query';
import ChartFrame from '@/components/atoms/ChartFrame';
import DonutChart from '@/components/chart/DonutChart';
import { donutCategoryUsage } from '@/utils/chartData';
import { Spinner } from '@nextui-org/react';
import Refresh from '@/components/atoms/Refresh';
import { getCategoryName } from '@/utils/axios/api';
import { ICategoryName } from '@/types/Api';

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

  const { data } = useQuery<ICategoryName>(['categoryName', categoryId], () => getCategoryName(categoryId));

  if (!categoryUsageData) {
    return (
      <div className="my-8">
        <ChartFrame>
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        </ChartFrame>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const chartData = donutCategoryUsage(categoryUsageData);
  const month = categoryUsageData[0].date;

  if (use === 'main') {
    return (
      <div className="w-full p-2">
        <div className="flex justify-end">
          <div className="text-sm itdaSecondary">
            {month} {data.categoryName}
          </div>
        </div>
        <div className="w-full h-full">
          <DonutChart title={`총 ${type === 'provide' ? '제공' : '사용'}량`} chartData={chartData} use="main" />
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
          {categoryUsageLoading ? (
            <div className="flex items-center justify-center" style={{ height: '200px' }}>
              <Spinner />
            </div>
          ) : (
            <DonutChart title={`총 ${type === 'use' ? '사용' : '제공'}량`} chartData={chartData} />
          )}
        </ChartFrame>
      </div>
    );
  }
}

CategoryUsage.defaultProps = {
  use: 'page',
};

export default CategoryUsage;