import Image from 'next/image';

interface LogoWithNameProps {
  size?: number;
  textSize?: string;
}

function LogoWithName({ size, textSize }: LogoWithNameProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Image src="/images/logo.png" alt="itda logo" width={size} height={size} />
      <div className={`font-bold ${textSize}`}>ITDA</div>
    </div>
  );
}

LogoWithName.defaultProps = {
  size: 35,
  textSize: 'text-xl',
};

export default LogoWithName;
