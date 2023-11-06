import ChipText from '@/components/atoms/ChipText';
import Copy from '@/components/atoms/Copy';

interface Props {
  method: string;
  endpoint: string;
}

function ApiEndpoint({ method, endpoint }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="itdaBlue font-semibold text-lg">ENDPOINT</div>
      <div className="border p-1 px-2 rounded-lg border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChipText label={method} />
            <div>{endpoint}</div>
          </div>
          <Copy copyText={endpoint} />
        </div>
      </div>
    </div>
  );
}

export default ApiEndpoint;
