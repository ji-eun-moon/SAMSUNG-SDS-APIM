import Image from 'next/image';
import { IDropdownItem } from '../types/props/NavBarProps';

interface IParams {
  userStatisticsUrl: string;
  adminStatisticsUrl: string;
  categoryUrl: string;
}

export const getUserDropDownList = ({ userStatisticsUrl, categoryUrl }: IParams): IDropdownItem[] => {
  const userDropDown: IDropdownItem[] = [
    {
      title: 'API 목록',
      icon: (
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
          />
        </svg>
      ),
      type: 'common',
      onClickHandler: `${categoryUrl}`,
    },
    {
      title: 'API 상태',
      icon: (
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ),
      type: 'common',
      onClickHandler: '/apis/status',
    },

    {
      title: '팀정보',
      icon: (
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
          />
        </svg>
      ),
      type: 'common',
      onClickHandler: '/team/token',
    },
    {
      title: '통계',
      icon: (
        <svg
          className="w-4 h-4 text-gray-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
          />
        </svg>
      ),
      type: 'common',
      onClickHandler: `${userStatisticsUrl}`,
    },
    {
      title: '신청 내역',
      icon: (
        <svg
          className="w-4 h-4 text-gray-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"
          />
        </svg>
      ),
      type: 'common',
      onClickHandler: '/apply/use/list',
    },
    {
      title: '로그아웃',
      icon: (
        <svg
          className="w-4 h-4 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          style={{ color: '#EE4587' }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
          />
        </svg>
      ),
      type: 'danger',
      onClickHandler: 'logout',
    },
  ];
  return userDropDown;
};

export const getAdminDropDownList = ({ adminStatisticsUrl, categoryUrl }: IParams): IDropdownItem[] => {
  const adminDropDown: IDropdownItem[] = [
    {
      title: 'API 목록',
      icon: (
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
          />
        </svg>
      ),
      type: 'common',
      onClickHandler: `${categoryUrl}`,
    },
    {
      title: 'API 상태',
      icon: (
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ),
      type: 'common',
      onClickHandler: `/apis/status`,
    },

    {
      title: '신청 내역',
      icon: (
        <svg
          className="w-4 h-4 text-gray-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"
          />
        </svg>
      ),
      type: 'common',
      onClickHandler: '/admin/useApplyList',
    },
    {
      title: '사원 관리',
      icon: (
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 18"
        >
          <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
      ),
      type: 'common',
      onClickHandler: '/member',
    },
    {
      title: '통계',
      icon: (
        <svg
          className="w-4 h-4 text-gray-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
          />
        </svg>
      ),
      type: 'common',
      onClickHandler: `${adminStatisticsUrl}`,
    },

    {
      title: '서버 모니터링',
      icon: <Image src="/images/desktop.png" alt="itda logo" width={22} height={22} />,
      type: 'common',
      onClickHandler: 'server',
    },
    {
      title: '사용량 모니터링',
      icon: <Image src="/images/database.png" alt="itda logo" width={22} height={22} />,
      type: 'common',
      onClickHandler: 'usage',
    },
    {
      title: '로그아웃',
      icon: (
        <svg
          className="w-4 h-4 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          style={{ color: '#EE4587' }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
          />
        </svg>
      ),
      type: 'danger',
      onClickHandler: 'logout',
    },
  ];
  return adminDropDown;
};

// export const getUserMypageList = (): IDropdownItem[] => {
//   const userMyPageDropDown: IDropdownItem[] = [
//     {
//       title: '개인정보',
//       icon: (
//         <svg
//           className="w-4 h-4 text-gray-800 dark:text-white"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 14 18"
//         >
//           <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//         </svg>
//       ),
//       type: 'common',
//       onClickHandler: `/mypage/info`,
//     },
//     {
//       title: '팀정보',
//       icon: (
//         <svg
//           className="w-4 h-4 text-gray-800 dark:text-white"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 20 20"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
//           />
//         </svg>
//       ),
//       type: 'common',
//       onClickHandler: '/team/token',
//     },
//     {
//       title: '로그아웃',
//       icon: (
//         <svg
//           className="w-4 h-4 dark:text-white"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 16 16"
//           style={{ color: '#EE4587' }}
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
//           />
//         </svg>
//       ),
//       type: 'danger',
//       onClickHandler: 'logout',
//     },
//   ];
//   return userMyPageDropDown;
// };

// export const getAdminMypageList = (): IDropdownItem[] => {
//   const adminMyPageDropDown: IDropdownItem[] = [
//     {
//       title: '개인정보',
//       icon: (
//         <svg
//           className="w-4 h-4 text-gray-800 dark:text-white"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 14 18"
//         >
//           <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//         </svg>
//       ),
//       type: 'common',
//       onClickHandler: `/mypage/info`,
//     },
//     {
//       title: '로그아웃',
//       icon: (
//         <svg
//           className="w-4 h-4 dark:text-white"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 16 16"
//           style={{ color: '#EE4587' }}
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
//           />
//         </svg>
//       ),
//       type: 'danger',
//       onClickHandler: 'logout',
//     },
//   ];
//   return adminMyPageDropDown;
// };
