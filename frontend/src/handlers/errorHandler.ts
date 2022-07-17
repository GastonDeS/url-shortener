import { status } from "../assets/constants";

export const handleFailure = (code: number, navigate: Function, defaultValue=undefined) => {
  if (code === status.NO_CONTENT) {
    return defaultValue;
  } else {
    if (code === status.UNAUTHORIZED || code === status.FORBIDDEN) {
      navigate(`/login?code=${code}`);
      return;
    } else if (code === status.PAGE_NOT_FOUND) {
      navigate("/404");
      return;
    } else {
      navigate(`/error?code=${code}`);
      return;
    }
  }
}