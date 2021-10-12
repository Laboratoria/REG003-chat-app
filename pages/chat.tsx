import type { NextPage } from "next";
import Header from '../components/Header/Header'
import TabsMenu from "../components/Tabs/tabs";
//TODO ROUTER
const Chat: NextPage = () => {
  return (
    <>
      <Header></Header>
      <TabsMenu></TabsMenu>
    </>
  );
};

export default Chat;
