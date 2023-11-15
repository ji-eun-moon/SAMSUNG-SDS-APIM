import React, { useEffect, useState } from 'react';
import { NavBarProps } from '@/types/props/NavBarProps';
import Image from 'next/image';
import StyledButton from '@/components/atoms/StyledButton';
import { useRouter } from 'next/router';
import { logout } from '@/utils/axios/auth';
import { Button } from '@nextui-org/react';
import CountBadge from '@/components/atoms/CountBadge';
// import SelectBox from '@/components/atoms/SelectBox';
import NoticeDropDown from '@/components/atoms/NoticeDropDown';
import DropDown from '@/components/atoms/DropDown';
import ProfileImg from '@/components/atoms/ProfileImg';
import useUserStore from '@/store/useUserStore';
// import useNoticeStore from '@/store/useNoticeStore';
import Link from 'next/link';
import SearchBar from '@/components/atoms/SearchBar';
import { IUser } from '@/types/User';
import { useQuery } from 'react-query';
import { getUserInfo } from '@/utils/axios/user';
import { getNoticeCnt } from '@/utils/axios/notice';
import { getUserDropDownList, getAdminDropDownList, getAdminMypageList, getUserMypageList } from '@/utils/dropDown';
import useUrl from '@/hooks/useUrl';
import useApi from '@/hooks/useApi';
import CustomSelect from '@/components/atoms/CustomSelect';
import NavBarNotice from '../NavBarNotice';
import Modal from '../Modal';
import styles from './NavBar.module.scss';

function NavBar({ position }: NavBarProps) {
  const router = useRouter();
  // const { setNoticeCount, noticeCount } = useNoticeStore((state) => state);
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const { data: noticeCount } = useQuery<number>('noticeCnt', getNoticeCnt, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  const { firstCategoryId } = useApi();
  const { selectedTeam, setSelectedTeam } = useUserStore();
  const { userStatisticsUrl, adminStatisticsUrl, categoryUrl } = useUrl(selectedTeam);
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

  const onClickHandler = () => {
    setSearchWord('');
    setSearchOpen(false);
  };

  const teamList = userInfo?.teams?.map((team) => team.teamName);

  useEffect(() => {
    if (!selectedTeam && teamList) {
      setSelectedTeam(teamList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userInfo || noticeCount === undefined) {
    return null;
  }

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
          <ProfileImg src={userInfo?.imageUrl} width={112} height={112} />
        </div>

        {/* 회원 정보 */}
        <div className="grid grid-cols-1 content-between h-full">
          <div className="my-3 col-span-1" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={`${styles.info} mb-3`}>
              <div className="font-semibold itdaSecondary">이름</div>
              <div className="itdaText">{userInfo?.name}</div>
            </div>

            <div className={`${styles.info} mb-3`}>
              <div className="font-semibold itdaSecondary">사번</div>
              <div className="itdaText">{userInfo?.employeeId}</div>
            </div>

            <div className={`${styles.info} mb-2`}>
              <div className="font-semibold itdaSecondary">부서</div>
              <div className="flex gap-1 itdaText">
                <div>{userInfo?.department}</div>
              </div>
            </div>

            <div className={`${styles.info}`}>
              <div className="flex items-center font-semibold itdaSecondary">팀명</div>
              {teamList && (
                <div className="itdaText flex items-center justify-start w-full">
                  <CustomSelect
                    items={teamList}
                    value={selectedTeam}
                    height="39px"
                    fontSize="13px"
                    onChange={handleSelectTeam}
                  />
                  {/* <SelectBox list={teamList} onChange={handleSelectTeam} defaultSelect={selectedTeam} /> */}
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
                  if (firstCategoryId === 0 || firstCategoryId === undefined) {
                    setAlertOpen(true);
                  } else {
                    router.push(`${categoryUrl}`);
                  }
                }}
                aria-hidden
                radius="full"
                type="button"
              />

              <CountBadge count={noticeCount?.toString()}>
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
              <div
                className={`${styles.shortcutBtn} flex justify-between cursor-pointer`}
                onClick={() => router.push('/team/token')}
                aria-hidden
              >
                <div className="text-sm">팀정보</div>
                <svg
                  className={`${styles.shortcutBtn} w-4 h-4 text-gray-400 dark:text-white`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 3a3 3 0 1 1-1.614 5.53M15 12a4 4 0 0 1 4 4v1h-3.348M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                  />
                </svg>
              </div>
              <div
                className={`${styles.shortcutBtn} flex justify-between cursor-pointer`}
                onClick={() => router.push('/mypage/info')}
                aria-hidden
              >
                <div className="text-sm">마이페이지</div>
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M19 11V9a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L12 2.757V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L2.929 4.343a1 1 0 0 0 0 1.414l.536.536L2.757 8H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535L8 17.243V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H18a1 1 0 0 0 1-1Z" />
                    <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </g>
                </svg>
              </div>
              <div
                className={`${styles.logoutBtn} flex justify-between cursor-pointer`}
                onClick={handleLogout}
                aria-hidden
              >
                <div className="text-sm">로그아웃</div>
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (position === 'top') {
    const currentPath = router.pathname;

    return (
      <div className={styles.navTopBody}>
        <div className="flex items-center gap-5">
          {router.pathname === '/' ? (
            <Image src="/images/samsung_sds_logo.png" width={150} height={150} alt="samsung logo" />
          ) : (
            <Link href="/">
              <Image src="/images/samsung_sds_logo.png" width={150} height={150} alt="samsung logo" />
            </Link>
          )}
          {currentPath === '/monitoring/server' && (
            <div style={{ fontSize: '20px', fontWeight: '400', paddingBottom: '5px' }}>
              <span style={{ marginRight: '10px' }}>|</span> Server
            </div>
          )}
          {currentPath === '/monitoring/usage' && (
            <div style={{ fontSize: '20px', fontWeight: '400', paddingBottom: '5px' }}>
              <span style={{ marginRight: '10px' }}>|</span> Usage
            </div>
          )}
        </div>

        <div className={`${styles.right}`}>
          {searchOpen ? (
            <div className="flex items-center justify-end">
              <div className="mr-5">
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
                onClick={() => onClickHandler()}
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
            <div className="flex items-center justify-end">
              {/* 팀 선택 */}
              {teamList && userInfo.authority !== '관리자' && (
                <div className="mr-6" style={{ width: '30%' }}>
                  <CustomSelect
                    items={teamList}
                    value={selectedTeam}
                    height="39px"
                    fontSize="13px"
                    onChange={handleSelectTeam}
                  />
                </div>
              )}
              {/* 회원정보 */}
              <DropDown
                trigger={
                  <div className={`${styles.topInfo} flex px-2 py-1 cursor-pointer`}>
                    <div className="mr-3">
                      <ProfileImg src={userInfo?.imageUrl} width={35} height={35} />
                    </div>
                    <div className="flex flex-col text-sm">
                      <div className="flex itdaText text-left font-semibold">{userInfo?.name}</div>
                      <div className="flex itdaSecondary">
                        <div>{userInfo?.department}</div>
                      </div>
                    </div>
                  </div>
                }
                list={userInfo?.authority === '관리자' ? getAdminMypageList() : getUserMypageList()}
                type="url"
                use="mypage"
              />
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
          <div className="flex justify-end mr-3">
            <NoticeDropDown
              trigger={
                <button type="button" className="flex justify-center items-center">
                  <CountBadge count={noticeCount?.toString()}>
                    <Image src="/icons/notice.png" alt="dropdown-icon" width={20} height={20} />
                  </CountBadge>
                </button>
              }
            >
              <div style={{ width: '380px' }} className="w-fit">
                <NavBarNotice />
              </div>
            </NoticeDropDown>
          </div>
          {/* 바로가기 드롭다운 */}
          <div className="flex justify-end mr-2">
            <DropDown
              trigger={
                <Button variant="bordered" style={{ minWidth: '0', borderRadius: '9999px' }}>
                  <Image src="/icons/dropdown.png" alt="dropdown-icon" width={20} height={20} />
                </Button>
              }
              list={
                userInfo?.authority === '관리자'
                  ? getAdminDropDownList({ adminStatisticsUrl, categoryUrl, userStatisticsUrl })
                  : getUserDropDownList({ adminStatisticsUrl, userStatisticsUrl, categoryUrl })
              }
              type="url"
              use="shortcut"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
