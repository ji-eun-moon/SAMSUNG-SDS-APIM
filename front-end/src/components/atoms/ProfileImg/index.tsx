import Image from 'next/image';
import { ProfileImgProps } from '@/types/props/NavBarProps';

function ProfileImg({ src, width, height }: ProfileImgProps) {
  return <Image src={src} alt="profile img" width={width} height={height} className="rounded-full" />;
}

export default ProfileImg;
