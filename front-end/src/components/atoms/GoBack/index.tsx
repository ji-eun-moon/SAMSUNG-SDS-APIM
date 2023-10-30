import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
  label: string;
}

function GoBack({ label }: IProps) {
  const router = useRouter();
  return (
    <div className="flex gap-5 items-center">
      <Image
        src="/icons/back.png"
        alt="back icon"
        width={25}
        height={25}
        onClick={() => router.back()}
        className="cursor-pointer"
        style={{ width: '20px', height: '20px' }}
      />
      <p className="text-2xl font-bold itdaText">{label}</p>
    </div>
  );
}

export default GoBack;
