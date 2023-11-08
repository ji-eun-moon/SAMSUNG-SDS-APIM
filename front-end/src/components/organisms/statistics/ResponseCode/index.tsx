import useResponseData from '@/hooks/useResponseData';
import { Spinner } from '@nextui-org/react';
import PieChart from '@/components/chart/PieChart';
import BarChart from '@/components/chart/BarChart';
import { transformResponseCodeData, barResponseCode } from '@/utils/chartData';

interface Props {
  apiId: number;
  teamName: string;
}

function ResponseCode({ apiId, teamName }: Props) {
  const { responseCodeData, isResponseCodeLoading } = useResponseData({
    apiId,
    teamName,
  });

  if (isResponseCodeLoading || !responseCodeData) {
    return (
      <div className="flex items-center justify-center" style={{ height: '200px' }}>
        <Spinner />
      </div>
    );
  }

  const pieChartData = transformResponseCodeData(responseCodeData);
  const BarChartData = barResponseCode(responseCodeData);

  return (
    <div className="flex gap-5">
      <PieChart title="" chartData={pieChartData} />
      <BarChart
        title=""
        chartDataName={BarChartData.xValues}
        chartDataValue={BarChartData.yValues}
        barColors={['#FEAEAE', '#FDD09F', '#FBE38E', '#A9F4D0', '#D0E8FF', '#9A89FF']}
      />
    </div>
  );
}

export default ResponseCode;
