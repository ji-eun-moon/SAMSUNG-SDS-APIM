export interface ILoginInfo {
  employeeId: string;
  password: string;
}

export interface ITeamInfo {
  teamName: string;
  teamId: number;
}

export interface IUserInfo {
  name: string;
  imageUrl: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
  team: ITeamInfo[];
  authority: '일반' | '관리자';
}

export type TMemberInfo = IUserInfo[];
