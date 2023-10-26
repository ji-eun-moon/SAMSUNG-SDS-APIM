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
  teams: TTeamList;
  authority: '일반' | '관리자';
}

// 관리자 - 전체 사원
export type TUserList = IUser[];

// 팀의 토큰
export interface ITeamToken {
  categoryId: number;
  categoryName: string;
  categoryToken: string;
}

export type TTeamTokenList = ITeamToken[];
