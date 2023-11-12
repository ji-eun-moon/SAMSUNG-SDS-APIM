// import { number } from 'echarts';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TopLayout from '@/components/templates/TopLayout';

const Monitoring: NextPage = () => {
  // 초기 state 값은 undefined로 세팅한다.
  const [windowSize, setWindowSize] = useState({
    w: 0,
    h: 0,
  });
  const { w, h } = windowSize;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          // 현재 브라우저의 가로, 세로 길이로 셋팅
          w: window.innerWidth - 30,
          h: window.innerHeight - 70,
        });
      };

      // resize 이벤트가 발생할 때 handleResize 함수가 실행되도록 한다.
      window.addEventListener('resize', handleResize);

      // 초기값을 설정할 수 있도록 handleResize 함수를 한 번 실행시킨다.
      handleResize();

      // 이벤트 리스너를 제거하여 이벤트 리스너가 리사이즈될 때마다 계속해서 생겨나지 않도록 처리한다. (clean up)
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', () => null);
  }, []); // 컴포넌트가 처음 마운트 될때와 언마운트 될 때 실행
  return (
    <TopLayout>
      <div style={{ width: `${w}px`, height: `${h}px` }}>
        <iframe
          src="https://k9c201.p.ssafy.io/kibana/app/dashboards#/view/9e206b90-8147-11ee-b5b1-05720a5cfdb7?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:usage-dashboard,viewMode:view)"
          height="100%"
          width="100%"
          title="monitoring"
        />
      </div>
    </TopLayout>
  );
};

export default Monitoring;
