import useResponseTime from '@/hooks/useResponseTime';
import { responseData } from '@/utils/chartData';
import ResponseTimeLine from '@/components/chart/ResponseTimeLine';
import { Spinner } from '@nextui-org/react';
import Refresh from '@/components/atoms/Refresh';
import ChartFrame from '@/components/atoms/ChartFrame';

interface Props {
  apiId: number;
  teamName: string;
  type: 'use' | 'provide';
}

function ResponseTime({ apiId, teamName, type }: Props) {
  const { responseTimeData, isResponseTimeLoading, refetchResponseTime } = useResponseTime({
    apiId,
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

  const chartData = responseData(responseTimeData);

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
        <ResponseTimeLine
          isSmooth={false}
          chartDataName={chartData.xValues}
          chartDataValue={chartData.yValues}
          responseCodeList={chartData.responseCodeList}
          chartColor="#95B7E1"
        />
      </ChartFrame>
    </div>
  );
}

export default ResponseTime;
