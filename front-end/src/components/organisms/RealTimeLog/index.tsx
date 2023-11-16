import ShadowCard from '@/components/atoms/ShadowCard';
import style from '@/styles/MainPage.module.scss';
// import Image from 'next/image';
// import Link from 'next/link';

function RealTimeLog() {
  return (
    // <div>
    //   {/* <div className={style.partTop}>
    //     <span className={`${style.partTitle}`}>실시간 로그</span>
    //   </div> */}
    //   <div className={`${style.thirdPart}`}>
    //     <ShadowCard type="small" bgcolor="#ffffff">
    //       <div className={style.contents}>관리자</div>
    //     </ShadowCard>
    //   </div>
    // </div>
    <div className={`${style.thirdPart}`}>
      <ShadowCard type="bordersmall" bgcolor="#ffffff">
        <div className={`${style.stateContainer}`}>
          <div className={`${style.state} ${style.stateBorder}`}>
            <span className={`${style.stateTitle}`}>오류율</span>
            <iframe
              src="https://k9c201.p.ssafy.io/kibana/app/dashboards#/create?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:26,i:'11bef5e1-eb11-4151-8c2c-8c01294c0540',w:48,x:0,y:0),id:c5cc3980-7d2d-11ee-bcd7-112832c9a464,panelIndex:'11bef5e1-eb11-4151-8c2c-8c01294c0540',type:search,version:'7.10.1')),query:(language:kuery,query:''),timeRestore:!f,title:'',viewMode:edit)"
              height="90%"
              width="100%"
              title="log"
            />
            <span>100%</span>
          </div>
          <div className={`${style.state} ${style.stateBorder}`}>
            <div className={`${style.stateTitle}`}>상태</div>
          </div>
          <div className={`${style.state}`}>
            <div className={`${style.stateTitle}`}>로그</div>
          </div>
        </div>
      </ShadowCard>
    </div>
  );
}

export default RealTimeLog;
