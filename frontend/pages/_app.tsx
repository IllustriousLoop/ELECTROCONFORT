import type { AppProps } from "next/app";
import Main from "../components/layout/Main";
import "antd/dist/antd.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
