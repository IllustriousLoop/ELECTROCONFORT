import type { AppProps } from "next/app";
import Main from "../components/layout/Main";
import "antd/dist/antd.css";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <ToastContainer />
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
