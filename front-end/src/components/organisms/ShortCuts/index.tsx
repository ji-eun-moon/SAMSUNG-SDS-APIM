import ShadowCard from '@/components/atoms/ShadowCard';
import Image from 'next/image';
import style from '@/styles/MainPage.module.scss';

function ShortCuts() {
  return (
    <div>
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>바로가기</span>
      </div>
      <div className={`${style.firstPart}`}>
        <div className={style.cardContainer}>
          <ShadowCard type="small">
            <div className={style.imgContainer}>
              <Image src="/images/myAPI.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
            </div>
          </ShadowCard>
          <p className={style.cardtitle}>나의 API</p>
        </div>

        <div className={style.cardContainer}>
          <ShadowCard type="small">
            <div className={style.imgContainer}>
              <Image src="/images/chart.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
            </div>
          </ShadowCard>
          <p className={style.cardtitle}>통계</p>
        </div>

        <div className={style.cardContainer}>
          <ShadowCard type="small">
            <div className={style.imgContainer}>
              <Image src="/images/monitoring.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
            </div>
          </ShadowCard>
          <p className={style.cardtitle}>서버 모니터링</p>
        </div>

        <div className={style.cardContainer}>
          <ShadowCard type="small">
            <div className={style.imgContainer}>
              <Image src="/images/applyList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
            </div>
          </ShadowCard>
          <p className={style.cardtitle}>신청내역</p>
        </div>

        <div className={style.cardContainer}>
          <ShadowCard type="small">
            <div className={style.imgContainer}>
              <Image src="/images/APIList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
            </div>
          </ShadowCard>
          <p className={style.cardtitle}>API 목록</p>
        </div>
      </div>
    </div>
  );
}

export default ShortCuts;
