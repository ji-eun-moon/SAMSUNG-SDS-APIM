import useCategoryResponseTime from '@/hooks/useCategoryResponseTime';
import Refresh from '@/components/atoms/Refresh';
import ChartFrame from '@/components/atoms/ChartFrame';
import { Spinner } from '@nextui-org/react';
import ScatterChart from '@/components/chart/ScatterChart';
import { formatScatterChartData } from '@/utils/chartData';

interface Props {
  categoryId: number;
  teamName: string;
  type: 'use' | 'provide';
}

function CategoryResponseTime({ categoryId, teamName, type }: Props) {
  const { responseTimeData, isResponseTimeLoading, refetchResponseTime } = useCategoryResponseTime({
    categoryId,
    teamName,
    type,
  });

  if (isResponseTimeLoading || !responseTimeData) {
    return (
      <ChartFrame>
        <div className="flex items-center justify-center" style={{ height: '200px' }}>
          <Spinner />
        </div>
      </ChartFrame>
    );
  }

  const chartData = formatScatterChartData(responseTimeData);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div>응답 시간</div>
        <div className="flex gap-2 items-center">
          <div className="itdaSecondary text-sm">* 최근 24시간 기준</div>
          <Refresh onClick={refetchResponseTime} />
        </div>
      </div>
      <ChartFrame>
        <ScatterChart chartData={chartData} />
      </ChartFrame>
    </div>
  );
}

export default CategoryResponseTime;
