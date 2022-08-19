import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthContext, {
  Role,
  AuthData,
  signInType,
} from "../ts/types/auth/authData";

type useAuthType = () => AuthContext;

const useAuth: useAuthType = () => {
  const [authData, setAuthData] = useState<AuthData>({
    isAuthenticated: false,
    role: Role.NoRole,
  });
  const router = useRouter();

  const redirect = () => {
    const redirect = router.asPath.split("=")[1];
    if (redirect) router.push(`/${redirect}`);
    else router.push("/");
  };

  const restoreAuth = () => {
    const authDataLocalStorage: any = localStorage.getItem("authData");
    const data = JSON.parse(authDataLocalStorage);

    if (data?.isAuthenticated) {
      setAuthData(data);
      redirect();
    }
  };

  const signIn: signInType = (role: Role) => {
    const newAuthData: AuthData = {
      isAuthenticated: true,
      role,
    };
    setAuthData(newAuthData);
    console.log("sign In");
    localStorage.setItem("authData", JSON.stringify(newAuthData));
    redirect();
  };

  const signOut = () => {
    setAuthData({
      isAuthenticated: false,
      role: Role.NoRole,
    });
    localStorage.removeItem("authData");
    toast.success("You are signed out");
    router.push("/auth/signIn");
  };

  return [authData, signIn, restoreAuth, signOut];
};

export default useAuth;
