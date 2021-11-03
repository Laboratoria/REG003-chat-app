import { createContext, useState } from "react";
import SocketIOClient from "socket.io-client";

export type GlobalContext = {
  socketOn: boolean;
  setSocketOn?: (c: boolean) => void;
};

export type ContextProvider = {
  children: React.ReactNode;
};

const InitialSocket: any = {};
export const SocketContext = createContext(InitialSocket);

export const SocketProvider = ({ children }: ContextProvider) => {
  const [socket, setSocket] = useState();
  const [listChats, setListChats] = useState<Array<any>>();
  const [listDiscover, setDiscover] = useState<Array<any>>();

  const connectSocket = () => {
    // @ts-ignore
    const sockets = SocketIOClient.connect(process.env.URL_API, {
      path: "/api/socket",
    });
    return sockets;
  };

  const disconnectSocket = () => {
    // @ts-ignores
    const sockets = socket.disconnect();
    console.log("socketOff", sockets);

    return sockets;
  };

  return (
    <SocketContext.Provider
      value={{
        connectSocket,
        disconnectSocket,
        socket,
        setSocket,
        listChats,
        setListChats,
        listDiscover,
        setDiscover,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
