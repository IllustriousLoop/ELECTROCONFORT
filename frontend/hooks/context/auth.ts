import { createContext } from "react";
import AuthContext, {
  Role,
} from "../../ts/types/auth/authData";

const auth = createContext<AuthContext>([
  {
    isAuthenticated: false,
    role: Role.NoRole,
  },
  () => {},
  () => {},
  () => {},
] as AuthContext);

export default auth;
