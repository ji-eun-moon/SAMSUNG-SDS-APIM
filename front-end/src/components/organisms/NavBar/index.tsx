import React, { useEffect } from 'react';
import { TopNavBarProps, SideNavBarProps } from '@/types/props/NavBarProps';
import Image from 'next/image';
import StyledButton from '@/components/atoms/StyledButton';
import { useRouter } from 'next/router';
import { logout } from '@/utils/axios/auth';
import CountBadge from '@/components/atoms/CountBadge';
import SelectBox from '@/components/atoms/SelectBox';
import NoticeDropDown from '@/components/atoms/NoticeDropDown';
import DropDown from '@/components/atoms/DropDown';
import LogoWithName from '@/components/atoms/LogoWithName';
import ProfileImg from '@/components/atoms/ProfileImg';
import useUserStore from '@/store/useUserStore';
import Link from 'next/link';
import styles from './NavBar.module.scss';

function NavBar({ position, userInfo, noticeCnt, ...props }: SideNavBarProps | TopNavBarProps) {
  const router = useRouter();
  const { selectedTeam, setSelectedTeam } = useUserStore();

  const handleSelectTeam = (team: string) => {
    setSelectedTeam(team);
  };

  const handleLogout = async () => {
    await logout();
    await router.push(`/login`);
  };

  const teamList = userInfo?.teams?.map((team) => team.teamName);

  useEffect(() => {
    if (teamList && teamList.length > 0 && !selectedTeam) {
      setSelectedTeam(teamList[0]);
    }
  }, [setSelectedTeam, teamList, selectedTeam]);

  if (position === 'side') {
    const { firstCategory } = props as SideNavBarProps;
    return (
      <div className={styles.navSideBody}>
        <button type="button" onClick={() => router.push('/')}>
          <LogoWithName />
        </button>

        {/* 프로필 이미지 */}
        <div className="flex justify-center mt-10 mb-6">
          <ProfileImg src={userInfo?.imageUrl} width={120} height={115} />
        </div>

        {/* 회원 정보 */}
        <div className="grid grid-cols-1 content-between h-full">
          <div className="grid grid-cols-4 gap-3 my-3 col-span-1">
            <div className="col-span-4 grid grid-cols-4 gap-3" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="col-span-1 font-semibold itdaSecondary text-sm">이름</div>
              <div className="col-span-3 itdaText">{userInfo?.name}</div>
            </div>

            <div className="col-span-4 grid grid-cols-4 gap-3" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="col-span-1 font-semibold itdaSecondary text-sm">사번</div>
              <div className="col-span-3 itdaText">{userInfo?.employeeId}</div>
            </div>

            <div className="col-span-4 grid grid-cols-4 gap-3" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="col-span-1 font-semibold itdaSecondary text-sm">부서</div>
              <div className="col-span-3 flex gap-1 itdaText">
                <div>{userInfo?.department}</div>
              </div>
            </div>

            <div className="col-span-4 grid grid-cols-4 gap-3" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="flex items-center col-span-1 font-semibold itdaSecondary text-sm">팀명</div>
              {teamList && (
                <div className="col-span-3 itdaText flex items-center w-9/12">
                  <SelectBox list={teamList} onChange={handleSelectTeam} defaultSelect={selectedTeam} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* 버튼 바로가기 */}
            <div className="flex flex-col justify-center col-span-1 gap-3">
              <StyledButton
                variant="bordered"
                label="API 전체보기"
                onClick={() => router.push(`/category/${firstCategory}`)}
                radius="full"
                type="button"
              />
              <CountBadge count={noticeCnt}>
                <StyledButton variant="solid" label="쪽지함" onClick={() => {}} radius="full" type="button" />
              </CountBadge>
            </div>

            {/* 텍스트 바로가기 */}
            <div className="itdaText flex flex-col gap-3">
              <div className="flex justify-between cursor-pointer" onClick={() => router.push('/mypage')} aria-hidden>
                <div className="text-sm">팀정보</div>
                <Image src="/icons/user.png" alt="user icon" width={20} height={16} />
              </div>
              <div className="flex justify-between cursor-pointer" onClick={() => router.push('/mypage')} aria-hidden>
                <div className="text-sm">마이페이지</div>
                <Image src="/icons/setting.png" alt="setting icon" width={23} height={21} />
              </div>
              <div className="flex justify-between cursor-pointer" onClick={handleLogout} aria-hidden>
                <div className="text-sm">로그아웃</div>
                <Image src="/icons/logout.png" alt="setting icon" width={18} height={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (position === 'top') {
    const { notices, dropDownList } = props as TopNavBarProps;

    return (
      <div className={styles.navTopBody}>
        <Link href="/">
          <LogoWithName />
        </Link>
        <div className="flex items-center">
          {/* 팀 선택 */}
          {teamList && (
            <div className="mr-10">
              <SelectBox list={teamList} onChange={handleSelectTeam} width="w-40" defaultSelect={selectedTeam} />
            </div>
          )}
          {/* 프로필 이미지 */}
          <div className="mr-3">
            <ProfileImg src={userInfo?.imageUrl} width={40} height={40} />
          </div>
          {/* 회원정보 */}
          <button type="button" className="flex flex-col mr-3 text-sm" onClick={() => router.push('/mypage')}>
            <div className="itdaText text-left font-semibold">{userInfo?.name}</div>
            <div className="flex itdaSecondary">
              <div>{userInfo?.department}</div>&nbsp;|&nbsp;
            </div>
          </button>
          <div className={styles.updown} />
          {/* API 검색 */}
          <svg
            className="w-6 h-6 mr-6 cursor-pointer text-gray-400 dark:text-white self-center"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            // onClick={onSearchHandler}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          {/* 쪽지 */}
          <div className="flex mr-6">
            <CountBadge count={noticeCnt}>
              <NoticeDropDown>{notices}</NoticeDropDown>
            </CountBadge>
          </div>
          {/* 바로가기 드롭다운 */}
          <div className="mr-3">
            <DropDown list={dropDownList} />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
