import { Session } from "next-auth/types";

export const ensureAuthenticated = (session: Session | null) => {
  if (session === null || session.user.id === undefined) {
    return false;
    // throw new Error("Unauthenticated!");
  }
  return true;
};
