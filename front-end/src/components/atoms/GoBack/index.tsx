import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
  label: string;
}

function GoBack({ label }: IProps) {
  const router = useRouter();
  return (
    <div className="flex gap-4 items-center">
      <Image
        src="/icons/back.png"
        alt="back icon"
        width={25}
        height={25}
        onClick={() => router.back()}
        className="cursor-pointer"
        style={{ width: '18px', height: '18px' }}
      />
      <div className="text-2xl font-semibold itdaText">{label}</div>
    </div>
  );
}

export default GoBack;
