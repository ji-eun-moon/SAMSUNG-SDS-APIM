import { Children } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SliderProps {
  /** 슬라이더 아이템 요소 */
  // children: React.ReactNode[];
  children: React.ReactNode;
}
function Carousel({ children }: SliderProps) {
  const showMax = 3;
  const arr = Children.toArray(children);
  const settings = {
    autoplay: true,
    infinite: arr.length > showMax,
    slidesToScroll: 1,
    arrows: false,
    slidesToShow: Math.min(arr.length, showMax), // 한 번에 보여질 슬라이드 수
    vertical: true, // 수직 슬라이드 여부
  };

  return <Slider {...settings}>{children}</Slider>;
}

export default Carousel;
