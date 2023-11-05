import ShadowCard from '@/components/atoms/ShadowCard';
import style from '@/styles/MainPage.module.scss';

function RealTimeLog() {
  return (
    <div>
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>실시간 로그</span>
      </div>
      <div className={`${style.thirdPart}`}>
        <ShadowCard type="small">
          <div className={style.contents}>관리자</div>
        </ShadowCard>
      </div>
    </div>
  );
}

export default RealTimeLog;
