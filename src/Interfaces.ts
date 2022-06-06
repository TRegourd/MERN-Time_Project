export interface IUser {
  adress?: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  position?: string;
  profilePicture?: string;
  __v?: number;
  _id: string;
}

export interface IProfileProps {
  currentUser: IUser;
  fetchAndSetCurrentUser: () => void;
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
