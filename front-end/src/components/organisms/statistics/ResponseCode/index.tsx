import useResponseCode from '@/hooks/useResponseCode';
import { Spinner } from '@nextui-org/react';
import PieChart from '@/components/chart/PieChart';
import BarChart from '@/components/chart/BarChart';
// import Refresh from '@/components/atoms/Refresh';
import ChartFrame from '@/components/atoms/ChartFrame';
import { transformResponseCodeData, barResponseCode } from '@/utils/chartData';

interface Props {
  apiId: number;
  teamName: string;
  type: 'use' | 'provide';
}

function ResponseCode({ apiId, teamName, type }: Props) {
  const { responseCodeData, isResponseCodeLoading } = useResponseCode({
    apiId,
    teamName,
    type,
  });

  if (!responseCodeData) {
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

  const pieChartData = transformResponseCodeData(responseCodeData);
  const BarChartData = barResponseCode(responseCodeData);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div>Response Code</div>
        <div className="flex gap-2 items-center">
          <div className="itdaSecondary text-sm">* 최근 24시간 기준</div>
          {/* <Refresh onClick={refetchResponseCode} /> */}
        </div>
      </div>
      <ChartFrame>
        {isResponseCodeLoading ? (
          <div className="flex items-center justify-center" style={{ height: '200px' }}>
            <Spinner />
          </div>
        ) : (
          <div className="flex gap-5">
            <PieChart
              title=""
              chartData={pieChartData}
              pieColors={['#FEAEAE', '#FDD09F', '#FBE38E', '#A9F4D0', '#D0E8FF', '#9A89FF']}
            />
            <BarChart
              title=""
              chartDataName={BarChartData.xValues}
              chartDataValue={BarChartData.yValues}
              barColors={['#FEAEAE', '#FDD09F', '#FBE38E', '#A9F4D0', '#D0E8FF', '#9A89FF']}
            />
          </div>
        )}
      </ChartFrame>
    </div>
  );
}

export default ResponseCode;
