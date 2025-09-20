import ErrorPage from "./CommonError";

export function NotFound() {
  return <ErrorPage code={404} message="Page Not Found" />;
}

export function ServerError() {
  return <ErrorPage code={500} message="Internal Server" />;
}

export function Forbidden() {
  return <ErrorPage code={403} message="You don't have permission" />;
}
