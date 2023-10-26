import React from 'react';
import { NavBarProps } from '@/types/props/NavBarProps';
import Image from 'next/image';
import StyledButton from '@/components/atoms/StyledButton';
import { useRouter } from 'next/router';
import LogoWithName from '@/components/atoms/LogoWithName';
import ProfileImg from '@/components/atoms/ProfileImg';
import styles from './NavBar.module.scss';

function NavBar(props: NavBarProps) {
  const router = useRouter();
  const { userInfo, position } = props;

  if (position === 'side') {
    return (
      <div className={styles.navBarBody}>
        <LogoWithName />

        {/* 프로필 이미지 */}
        <div className="flex justify-center my-12">
          <ProfileImg src={userInfo.imageUrl} width={132.936} height={128.288} />
        </div>

        {/* 회원 정보 */}
        <div className="grid grid-cols-1 content-between h-full">
          <div className="grid grid-cols-4 gap-3 my-4 col-span-1">
            <div className="col-span-1 font-semibold itdaSecondary">이름</div>
            <div className="col-span-3 itdaText">{userInfo.name}</div>

            <div className="col-span-1 font-semibold itdaSecondary">사번</div>
            <div className="col-span-3 itdaText">{userInfo.employeeId}</div>

            <div className="col-span-1 font-semibold itdaSecondary">부서</div>
            <div className="col-span-3 flex gap-1 itdaText">
              <div>{userInfo.department}</div>
              <div>{userInfo.position}</div>
            </div>

            <div className="col-span-1 font-semibold itdaSecondary">팀명</div>
            <div className="col-span-3 itdaText">셀렉트 박스</div>
          </div>

          <div className="flex flex-col gap-6">
            {/* 버튼 바로가기 */}
            <div className="flex flex-col justify-center col-span-1 gap-3">
              <StyledButton
                variant="bordered"
                label="API 전체보기"
                onClick={() => router.push('/apis/[categoryId]/list')}
                radius="full"
              />
              <StyledButton variant="solid" label="쪽지함" onClick={() => {}} radius="full" />
            </div>

            {/* 텍스트 바로가기 */}
            <div className="itdaText flex flex-col gap-3">
              <div className="flex justify-between" onClick={() => {}} aria-hidden>
                <div>팀정보</div>
                <Image src="/icons/user.png" alt="user icon" width={22} height={20} />
              </div>
              <div className="flex justify-between" onClick={() => router.push('/mypage')} aria-hidden>
                <div>마이페이지</div>
                <Image src="/icons/setting.png" alt="setting icon" width={25} height={25} />
              </div>
              <div className="flex justify-between" onClick={() => {}} aria-hidden>
                <div>로그아웃</div>
                <Image src="/icons/logout.png" alt="setting icon" width={20} height={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (position === 'top') {
    return <div>상단 네비바</div>;
  }
}

export default NavBar;
