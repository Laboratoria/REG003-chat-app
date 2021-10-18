import { createContext, useState } from "react";

export type GlobalContext = {
  socketOn: boolean;
  setSocketOn?: (c: boolean) => void;
};

export type ContextProvider = {
  children: React.ReactNode;
};

const InitialSocket = () => {
  const [socketOn, setSocketOn] = useState(false);

  const connectSocket = () => {
    // @ts-ignore
    SocketIOClient.connect(process.env.URL_API, {
      path: "/api/socket",
    });
    console.log("socketOn");
    setSocketOn(true);
  };

  const disconnectSocket = () => {
    // @ts-ignore
    SocketIOClient.disconnect();
    console.log("socketOff");
    setSocketOn(false);
  };

  return [connectSocket, disconnectSocket];
};

export const SocketContext = createContext(InitialSocket);

export const SocketProvider = ({ children }: ContextProvider) => {
  return (
    <SocketContext.Provider value={InitialSocket}>
      {children}
    </SocketContext.Provider>
  );
};
