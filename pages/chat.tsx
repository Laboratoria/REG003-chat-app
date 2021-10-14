import type { NextPage } from 'next';
import Header from '../components/Header/Header'
import TabsMenu from '../components/Tabs/tabs';
import ListChat from '../components/List-Chat/ListChat'
import SearchSide from '../components/Search/Search';
import { useState } from "react";
//TODO ROUTER
const Chat: NextPage = () => {
  const [channelTitle, setChannelTitle] = useState("holis")
  const [lastMessage, setLastChannel] = useState("tomar agua es bueno")
  const [time, setTime] = useState("10:30")
  const [activeSearch, setActiveSearch] = useState(false)
  return (
    <section className="container">
      <Header setActiveSearch={setActiveSearch} activeSearch={activeSearch}></Header>
      <TabsMenu></TabsMenu>
      {activeSearch ? <SearchSide ></SearchSide> :''}
      <ListChat channelTitle={channelTitle} lastMessage={lastMessage} time={time}></ListChat>
    </section>
  );
};

export default Chat;
