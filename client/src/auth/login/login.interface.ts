export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export interface ILoginResponse {
  message: string;
  metadata: {
    code: number;
    user: { _id: string; username: string; name: string; avatar: string };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface ISignUpResponse {
  message: string;
  metadata: {
    code: number;
    user: { _id: string; username: string; name: string; avatar: string };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
