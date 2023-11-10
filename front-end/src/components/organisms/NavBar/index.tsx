import React, { useEffect, useState } from 'react';
import { NavBarProps } from '@/types/props/NavBarProps';
import Image from 'next/image';
import StyledButton from '@/components/atoms/StyledButton';
import { useRouter } from 'next/router';
import { logout } from '@/utils/axios/auth';
import { Button } from '@nextui-org/react';
import CountBadge from '@/components/atoms/CountBadge';
import SelectBox from '@/components/atoms/SelectBox';
import NoticeDropDown from '@/components/atoms/NoticeDropDown';
import DropDown from '@/components/atoms/DropDown';
// import LogoWithName from '@/components/atoms/LogoWithName';
import ProfileImg from '@/components/atoms/ProfileImg';
import useUserStore from '@/store/useUserStore';
import Link from 'next/link';
import SearchBar from '@/components/atoms/SearchBar';
import { IUser } from '@/types/User';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/utils/axios/user';
import { getNoticeCnt } from '@/utils/axios/notice';
import { TCategoryList } from '@/types/Api';
import { getCategoryList } from '@/utils/axios/api';
import { getUserDropDownList, getAdminDropDownList } from '@/utils/dropDown';
import NavBarNotice from '../NavBarNotice';
import Modal from '../Modal';
import styles from './NavBar.module.scss';

function NavBar({ position }: NavBarProps) {
  const router = useRouter();
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: noticeCnt } = useQuery<number>('noticeCnt', getNoticeCnt);
  const { data: categoryList } = useQuery<TCategoryList>('categoryList', getCategoryList);
  const { selectedTeam, setSelectedTeam } = useUserStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const handleSelectTeam = (team: string) => {
    setSelectedTeam(team);
  };

  const handleLogout = async () => {
    await logout();
    await router.push(`/login`);
  };

  const teamList = userInfo?.teams?.map((team) => team.teamName);

  useEffect(() => {
    if (!selectedTeam && teamList) {
      setSelectedTeam(teamList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userInfo || noticeCnt === undefined || !categoryList) {
    return null;
  }

  const firstCategory = categoryList[0]?.categoryId;
  const firstApi = categoryList[0]?.apiList[0].apiId;

  if (position === 'side') {
    return (
      <div className={styles.navSideBody}>
        {alertOpen && <Modal type="alert" alertMessage="등록된 API가 없습니다." onClose={() => setAlertOpen(false)} />}

        {router.pathname === '/' ? (
          <Image src="/images/samsung_sds_logo.png" width={150} height={150} alt="samsung logo" />
        ) : (
          <button type="button" onClick={() => router.push('/')}>
            <Image src="/images/samsung_sds_logo.png" width={150} height={150} alt="samsung logo" />
          </button>
        )}

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
                onClick={() => {
                  if (firstCategory === 0 || firstCategory === undefined) {
                    setAlertOpen(true);
                  } else {
                    router.push(`/category/${firstCategory}`);
                  }
                }}
                aria-hidden
                radius="full"
                type="button"
              />

              <CountBadge count={noticeCnt?.toString()}>
                <StyledButton
                  variant="solid"
                  label="쪽지함"
                  onClick={() => router.push(`/notice/receive`)}
                  radius="full"
                  type="button"
                />
              </CountBadge>
            </div>

            {/* 텍스트 바로가기 */}
            <div className="itdaText flex flex-col gap-3">
              <div className="flex justify-between cursor-pointer" onClick={() => router.push('/team')} aria-hidden>
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
    return (
      <div className={styles.navTopBody}>
        {router.pathname === '/' ? (
          <Image src="/images/samsung_sds_logo.png" width={150} height={150} alt="samsung logo" />
        ) : (
          <Link href="/">
            <Image src="/images/samsung_sds_logo.png" width={150} height={150} alt="samsung logo" />
          </Link>
        )}
        <div className="flex items-center">
          {searchOpen ? (
            <div className="flex items-center">
              <div className="">
                <SearchBar
                  keyword={searchWord}
                  onChange={setSearchWord}
                  onSearchHandler={() => router.push(`/apis/search?query=${searchWord}`)}
                  placeholder="API 검색"
                />
              </div>
              <div className={styles.updownSearch} />
              <svg
                className="w-5 h-5 mr-6 cursor-pointer text-gray-400 dark:text-white self-center"
                onClick={() => setSearchOpen(false)}
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </div>
          ) : (
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
                  <div>{userInfo?.department}</div>
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
                onClick={() => setSearchOpen(true)}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          )}
          {/* 쪽지 */}
          <div className="flex mr-6">
            <NoticeDropDown
              trigger={
                <button type="button" className="flex justify-center items-center">
                  <CountBadge count={noticeCnt?.toString()}>
                    <Image src="/icons/notice.png" alt="dropdown-icon" width={20} height={20} />
                  </CountBadge>
                </button>
              }
            >
              <div style={{ minWidth: '320px' }} className="w-fit">
                <NavBarNotice />
              </div>
            </NoticeDropDown>
          </div>
          {/* 바로가기 드롭다운 */}
          <div className="mr-3">
            <DropDown
              trigger={
                <Button variant="bordered" style={{ minWidth: '0', borderRadius: '9999px' }}>
                  <Image src="/icons/dropdown.png" alt="dropdown-icon" width={20} height={20} />
                </Button>
              }
              list={
                userInfo.authority === '관리자'
                  ? getAdminDropDownList({ categoryId: firstCategory, apiId: firstApi })
                  : getUserDropDownList({ categoryId: firstCategory, apiId: firstApi })
              }
              type="url"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
