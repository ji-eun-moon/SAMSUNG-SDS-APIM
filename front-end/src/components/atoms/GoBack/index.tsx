import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
  label: string;
}

function GoBack({ label }: IProps) {
  const router = useRouter();
  return (
    <div className="flex gap-5">
      <Image
        src="/icons/back.png"
        alt="back icon"
        width={30}
        height={30}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <p className="text-3xl font-bold itdaText">{label}</p>
    </div>
  );
}

export default GoBack;
