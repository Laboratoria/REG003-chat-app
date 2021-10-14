import type { NextPage } from 'next';
import Header from '../components/Header/Header'
import TabsMenu from '../components/Tabs/tabs';
import ListChat from '../components/List-Chat/ListChat'
//TODO ROUTER
const Chat: NextPage = () => {
  return (
    < >
      <Header></Header>
      <TabsMenu></TabsMenu>
      <ListChat></ListChat>
    </>
  );
};

export default Chat;
