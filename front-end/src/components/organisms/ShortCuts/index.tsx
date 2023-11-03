import ShadowCard from '@/components/atoms/ShadowCard';
import Image from 'next/image';
import style from '@/styles/MainPage.module.scss';
import { TCategoryList } from '@/types/Api';
import { useQuery } from 'react-query';
import { getCategoryList } from '@/utils/axios/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { IUser } from '@/types/User';
import { getUserInfo } from '@/utils/axios/user';
import Modal from '../Modal';

function ShortCuts() {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);

  let firstCategory = 0;
  if (categoryList) {
    firstCategory = categoryList[0]?.categoryId || 0;
  }

  const urlList = {
    ApiStatus: `/apis/status`,
    statistics: `/statistics/${firstCategory}`,
    monitoring: '/monitoring',
    applyList: '/apply/use/list',
    allApi: `/category/${firstCategory}`,
    memberList: `/member/list`,
  };

  const closeModal = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      {alertOpen && <Modal type="alert" alertMessage="등록된 API가 없습니다." onClose={closeModal} />}
      <div className={style.partTop}>
        <span className={`${style.partTitle}`}>바로가기</span>
      </div>
      <div className={`${style.firstPart}`}>
        <div onClick={() => router.push(urlList.ApiStatus)} aria-hidden>
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image src="/images/myAPI.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>API 상태</p>
          </div>
        </div>

        <div
          onClick={() => {
            if (firstCategory === 0 || firstCategory === undefined) {
              setAlertOpen(true);
            } else {
              router.push(urlList.statistics);
            }
          }}
          aria-hidden
        >
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image src="/images/chart.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>통계</p>
          </div>
        </div>
        <Link href={urlList.monitoring} target="_blank">
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

        <div onClick={() => router.push(urlList.applyList)} aria-hidden>
          <div className={style.cardContainer}>
            <ShadowCard type="small">
              <div className={style.imgContainer}>
                <Image src="/images/applyList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
              </div>
            </ShadowCard>
            <p className={style.cardtitle}>신청내역</p>
          </div>
        </div>

        {/* API 신청 목록 */}
        {userInfo?.authority === '관리자' ? (
          <div
            onClick={() => {
              if (firstCategory === 0) {
                setAlertOpen(true);
              } else {
                router.push(urlList.memberList);
              }
            }}
            aria-hidden
          >
            <div className={style.cardContainer}>
              <ShadowCard type="small">
                <div className={style.imgContainer}>
                  <Image src="/images/APIList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
                </div>
              </ShadowCard>
              <p className={style.cardtitle}>팀 관리</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              if (firstCategory === 0) {
                setAlertOpen(true);
              } else {
                router.push(urlList.allApi);
              }
            }}
            aria-hidden
          >
            <div className={style.cardContainer}>
              <ShadowCard type="small">
                <div className={style.imgContainer}>
                  <Image src="/images/APIList.png" alt="next-icon" width={100} height={100} className={style.iconImg} />
                </div>
              </ShadowCard>
              <p className={style.cardtitle}>API 목록</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShortCuts;
