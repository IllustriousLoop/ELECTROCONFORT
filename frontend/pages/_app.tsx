import type { AppProps } from "next/app";
import Main from "../components/layout/Main";
import { ToastContainer } from "react-toastify";
import "../styles/global.css";
import "antd/dist/antd.css";
import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <ToastContainer />
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
