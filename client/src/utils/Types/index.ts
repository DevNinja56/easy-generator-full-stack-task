export type signUpForm = {
  name: string;
  email: string;
  password: string;
};

export type signInForm = {
  email: string;
  password: string;
};

export type editUserForm = {
  name: string;
  email: string;
};

export interface userType {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GetPaginatedResponseInterface<T> {
  data: T;
  count: number;
  limit: number;
  nextPage: number | null;
  page: number;
  totalPage: number;
}
