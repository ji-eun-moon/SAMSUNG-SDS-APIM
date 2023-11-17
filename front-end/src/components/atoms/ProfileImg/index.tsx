import Image from 'next/image';
import { useState } from 'react';
import { ProfileImgProps } from '@/types/props/NavBarProps';

function ProfileImg({ src, width, height }: ProfileImgProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc('/images/userimg.png');
  };

  return (
    <Image
      src={imgSrc}
      alt="profile img"
      width={width}
      height={height}
      className="rounded-full"
      onError={handleError}
    />
  );
}

export default ProfileImg;
