import ShadowCard from '@/components/atoms/ShadowCard';
import Image from 'next/image';
import style from '@/styles/MainPage.module.scss';
import Link from 'next/link';

interface Props {
  firstCategory: number;
}

function ShortCuts({ firstCategory }: Props) {
  const urlList = {
    ApiStatus: `/apis/status`,
    statistics: `/statistics/${firstCategory}`,
    monitoring: '/monitoring',
    applyList: '/apply/use/list',
    allApi: `/category/${firstCategory}`,
  };

  return (
    <div>
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>바로가기</span>
      </div>
      <div className={`${style.firstPart}`}>
        <Link href={urlList.ApiStatus}>
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image src="/images/myAPI.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>API 상태</p>
          </div>
        </Link>

        <Link href={urlList.statistics}>
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image src="/images/chart.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>통계</p>
          </div>
        </Link>

        <Link href={urlList.monitoring}>
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image
                  src="/images/monitoring.png"
                  alt="next-icon"
                  width={100}
                  height={100}
                  className={style.iconImg}
                />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>서버 모니터링</p>
          </div>
        </Link>

        <Link href={urlList.applyList}>
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image src="/images/applyList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>신청내역</p>
          </div>
        </Link>

        <Link href={urlList.allApi}>
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image src="/images/APIList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>API 목록</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ShortCuts;
