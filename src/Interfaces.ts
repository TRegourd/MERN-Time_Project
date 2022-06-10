export interface IUser {
  adress?: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  password?: string;
  confirmPassword?: string;
  position?: string;
  _id: string;
  isAdmin?: boolean;
}

export interface IProfileProps {
  currentUser: IUser;
}

export interface ITimeList {
  createdAt: string;
  date: Date;
  desc: string;
  duration: number;
  project: any;
  user: any;
  _id: string;
}

export interface IStyledCardProps {
  big?: boolean;
  small?: boolean;
  eye?: boolean;
}
