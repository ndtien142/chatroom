function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOT_AUTH = "/auth";

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, "/login"),
  signUp: path(ROOT_AUTH, "/signup"),
  resetPassword: path(ROOT_AUTH, "/reset-password"),
  forgotPassword: path(ROOT_AUTH, "/forgot-password"),
};

export const PATH_PAGE = {
  page403: "/403",
  page404: "/404",
  page500: "/500",
};

export const PATH_MAIN = {
  root: "/",
};
