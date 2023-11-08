import useResponseData from '@/hooks/useResponseData';
import { responseData } from '@/utils/chartData';
import LineChart from '@/components/chart/LineChart';
import { Spinner } from '@nextui-org/react';

interface Props {
  apiId: number;
  teamName: string;
}

function ResponseTime({ apiId, teamName }: Props) {
  const { responseTimeData, isResponseTimeLoading } = useResponseData({
    apiId,
    teamName,
  });

  if (isResponseTimeLoading || !responseTimeData) {
    return (
      <div className="flex items-center justify-center" style={{ height: '200px' }}>
        <Spinner />
      </div>
    );
  }

  const chartData = responseData(responseTimeData);

  return (
    <div>
      <LineChart
        title=""
        type="ResponseTime"
        isSmooth={false}
        chartDataName={chartData.xValues}
        chartDataValue={chartData.yValues}
        responseCodeList={chartData.responseCodeList}
        chartColor="#95B7E1"
      />
    </div>
  );
}

export default ResponseTime;
