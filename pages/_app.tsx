import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../styles/index.scss";
import { SocketProvider } from "../contexts/socketContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}
export default MyApp;
