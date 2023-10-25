import Image from 'next/image';

function LogoWithName() {
  return (
    <div className="flex justify-center items-center gap-2">
      <Image src="/images/logo.png" alt="itda logo" width={35} height={35} />
      <p className="font-bold text-xl">ITDA</p>
    </div>
  );
}

export default LogoWithName;
