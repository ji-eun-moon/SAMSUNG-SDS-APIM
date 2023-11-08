// import { TSearchMembers } from './Notice';

export interface ILogin {
  employeeId: string;
  password: string;
}

// 팀 멤버 상세 정보
export interface ITeamMember {
  name: string;
  imageUrl: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
}

export type TTeamMemberList = ITeamMember[];

export interface ITeam {
  teamName: string;
  teamId: number;
  teamCount: number;
  teamMembers: TTeamMemberList;
}

export type TTeamList = ITeam[];

// 회원 정보 조회
export interface IUser {
  name: string;
  imageUrl: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
  memberId: number;
  teams: TTeamList;
  // authority: '일반' | '관리자';
  authority: string;
}

// 관리자 - 전체 사원
export type TUserList = IUser[];

export interface IUserInfo {
  content: TUserList;
  totalPages: number;
}

// 팀의 토큰
export interface ITeamToken {
  categoryId: number;
  categoryName: string;
  token: string;
}

export type TTeamTokenList = ITeamToken[];

// createMembers 헤더매핑
export interface HeaderMapping {
  사번: string;
  성명: string;
  사진url: string;
  권한: string;
  부서: string;
  직무: string;
  이메일: string;
  팀: string;
}

export interface IUserData {
  employeeId: string;
  name: string;
  imageUrl: string;
  email: string;
  teamList: string[];
  position: string;
  department: string;
  authority: string;
}

export type TUserDataList = IUserData[];

export interface Pageable {
  page: number;
  size: number;
}

export interface TeamPageable extends Pageable {
  teamName: string;
}

export interface ITeamMemberPage {
  content: TTeamMemberList;
  totalPages: number;
}

export interface ITeamInfo {
  teamId: number;
  teamName: string;
  teamMembers: ITeamMemberPage;
}

export interface ISearchMember {
  name: string;
  imageUrl: string;
  memberId: number;
  department: string;
  position: string;
}

export type TSearchMembers = ISearchMember[];
