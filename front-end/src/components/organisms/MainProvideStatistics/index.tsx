import React from 'react';
import { IUser } from '@/types/User';
import { getUserInfo } from '@/utils/axios/user';
import { useQuery } from 'react-query';
import { ICategory } from '@/types/Api';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'next/router';
import ShadowCard from '@/components/atoms/ShadowCard';
import styles from '@/components/organisms/UserMainBox/UserMainBox.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import useMyApi from '@/hooks/useMyApi';
import CategoryUsage from '../statistics/CategoryUsage';

function MainProvideStatistics() {
  const router = useRouter();
  const { selectedTeam } = useUserStore();
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const defaultTeamName = userInfo?.teams[0]?.teamName;
  const initialTeam = selectedTeam ?? defaultTeamName;
  const { provideCategoryList } = useMyApi(initialTeam);

  if (provideCategoryList === undefined) {
    return null;
  }

  return (
    <div className="w-1/2">
      <div className="flex justify-between">
        <div className="flex items-center pb-1">
          <svg
            className="w-4 h-4 mr-1 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 18"
            style={{ color: '#9a9a9a' }}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
            />
          </svg>
          <div className="samsungLogo">제공량 통계</div>
        </div>
        <button type="button" className={styles.goDetail} onClick={() => router.push('/')}>
          상세보기
          <svg
            className="w-3 h-3 pl-2 text-gray-500 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </button>
      </div>
      <div className="w-full">
        <ShadowCard type="bordersmall">
          <div style={{ width: '32.5vw', height: '30.5vh' }}>
            <Slider
              autoplay
              infinite
              slidesToScroll={1}
              arrows={false}
              slidesToShow={1}
              speed={2000}
              autoplaySpeed={5000}
            >
              {provideCategoryList &&
                provideCategoryList.length !== 0 &&
                provideCategoryList.map((category: ICategory) => (
                  <div key={category.categoryId} className="w-full">
                    <CategoryUsage categoryId={category.categoryId} teamName={initialTeam} type="provide" use="main" />
                  </div>
                ))}
            </Slider>
            {!provideCategoryList ||
              (provideCategoryList.length === 0 && (
                <div
                  className="flex justify-center items-center text-sm itdaText"
                  style={{ width: '100%', height: '100%' }}
                >
                  제공중인 카테고리가 없습니다
                </div>
              ))}
          </div>
        </ShadowCard>
      </div>
    </div>
  );
}

export default MainProvideStatistics;
