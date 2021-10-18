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
    setSocketOn(true);
  };

  const disconnectSocket = () => {
    // @ts-ignore
    SocketIOClient.disconnect();
    setSocketOn(false);
  };
};

const SocketContext = createContext(InitialSocket);

export const SocketProvider = ({ children }: ContextProvider) => {
  return (
    <SocketContext.Provider value={InitialSocket}>
      {children}
    </SocketContext.Provider>
  );
};
