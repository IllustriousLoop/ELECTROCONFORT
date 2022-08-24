import type { AppProps } from "next/app";
import Main from "../components/layout/Main";
import { ToastContainer } from "react-toastify";
import auth from "../hooks/context/auth";
import "../styles/global.css";
// import "antd/dist/antd.dark.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.min.css";
import useAuth from "../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  const Auth = useAuth();

  return (
    <auth.Provider value={Auth}>
      <Main>
        <ToastContainer />
        <Component {...pageProps} />
      </Main>
    </auth.Provider>
  );
}

export default MyApp;
