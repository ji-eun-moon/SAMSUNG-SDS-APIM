import useResponseTime from '@/hooks/useResponseTime';
import { responseData } from '@/utils/chartData';
import ResponseTimeLine from '@/components/chart/ResponseTimeLine';
import { Spinner } from '@nextui-org/react';
// import Refresh from '@/components/atoms/Refresh';
import ChartFrame from '@/components/atoms/ChartFrame';

interface Props {
  apiId: number;
  teamName: string;
  type: 'use' | 'provide';
}

function ResponseTime({ apiId, teamName, type }: Props) {
  const { responseTimeData, isResponseTimeLoading } = useResponseTime({
    apiId,
    teamName,
    type,
  });

  if (!responseTimeData) {
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

  const chartData = responseData(responseTimeData);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div>Response Time</div>
        <div className="flex gap-2 items-center">
          {/* <Refresh onClick={refetchResponseTime} /> */}
          <div aria-hidden className="p-1 border-1 border-transparent">
            <svg className="w-5 h-5" />
          </div>
          <div className="itdaSecondary text-sm">* 최근 24시간 기준</div>
        </div>
      </div>
      <ChartFrame>
        {isResponseTimeLoading ? (
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        ) : (
          <ResponseTimeLine
            isSmooth={false}
            chartDataName={chartData.xValues}
            chartDataValue={chartData.yValues}
            responseCodeList={chartData.responseCodeList}
            chartColor="#95B7E1"
          />
        )}
      </ChartFrame>
    </div>
  );
}

export default ResponseTime;
