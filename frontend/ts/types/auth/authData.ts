export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  NoRole = "NoRole",
}
export type AuthData = {
  isAuthenticated: boolean;
  role: Role;
};
export type signInType = (role: Role) => void;
export type signOutType = () => void;
export type restoreAuthType = () => void;

type AuthContext = [AuthData, signInType, restoreAuthType, signOutType];

export default AuthContext;
