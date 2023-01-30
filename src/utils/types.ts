export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateeUserParams = {
  username?: string;
  password?: string;
};

export type CreateUserProfileParams = {
  firstName?: string;
  lastName?: string;
  age?: number;
  dob?: string;
};

export type CreateUserPostParams = {
  title?: string;
  desc?: string;
};
