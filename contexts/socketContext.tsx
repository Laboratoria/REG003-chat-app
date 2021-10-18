import { createContext, useState } from "react";
import SocketIOClient from "socket.io-client";

export type GlobalContext = {
  socketOn: boolean;
  setSocketOn?: (c: boolean) => void;
};

export type ContextProvider = {
  children: React.ReactNode;
};

const InitialSocket = () => {
/*   const [socketOn, setSocketOn] = useState(false); */

  const connectSocket = () => {
    // @ts-ignore
   const socket = SocketIOClient.connect(process.env.URL_API, {
      path: "/api/socket",
    });

    return socket
  };

  const disconnectSocket = () => {
    // @ts-ignore
    const socket = SocketIOClient.disconnect;
    console.log("socketOff");
    console.log(socket)
    return socket
  };

  return { connectSocket, disconnectSocket };
};

export const SocketContext = createContext(InitialSocket);

export const SocketProvider = ({ children }: ContextProvider) => {
  return (
    <SocketContext.Provider value={InitialSocket}>
      {children}
    </SocketContext.Provider>
  );
};
