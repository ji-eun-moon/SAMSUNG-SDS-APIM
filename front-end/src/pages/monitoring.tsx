// import { number } from 'echarts';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

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
          w: window.innerWidth,
          h: window.innerHeight,
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
    <div style={{ width: `${w}px`, height: `${h}px` }}>
      <iframe
        src="http://k9c201.p.ssafy.io:5601/app/dashboards#/view/cf3bff00-7d2d-11ee-bcd7-112832c9a464?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1d,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(columns:!(_id,createdAt,categoryId,endpoint,method,responseCode,responseTime,teamName)),gridData:(h:11,i:'63e3babb-9add-4668-a957-a171e696b673',w:46,x:1,y:0),id:c5cc3980-7d2d-11ee-bcd7-112832c9a464,panelIndex:'63e3babb-9add-4668-a957-a171e696b673',type:search,version:'7.10.1'),(embeddableConfig:(),gridData:(h:15,i:'41226ddc-eb2c-4ccb-8209-c019863a3a30',w:24,x:1,y:11),id:c186b5b0-7d2f-11ee-bcd7-112832c9a464,panelIndex:'41226ddc-eb2c-4ccb-8209-c019863a3a30',type:visualization,version:'7.10.1'),(embeddableConfig:(),gridData:(h:8,i:'3caee181-4884-4472-ae7b-2a07e80bf7bc',w:9,x:25,y:11),id:c9d96f40-7d2b-11ee-bcd7-112832c9a464,panelIndex:'3caee181-4884-4472-ae7b-2a07e80bf7bc',type:lens,version:'7.10.1'),(embeddableConfig:(),gridData:(h:8,i:'3ef3886b-0662-44a8-9e2b-7dc5b998695b',w:13,x:34,y:11),id:fa1b7300-7d2c-11ee-bcd7-112832c9a464,panelIndex:'3ef3886b-0662-44a8-9e2b-7dc5b998695b',type:lens,version:'7.10.1')),query:(language:kuery,query:''),timeRestore:!f,title:group,viewMode:edit)&show-time-filter=true"
        height="100%"
        width="100%"
        title="monitoring"
      />
    </div>
  );
};

export default Monitoring;
