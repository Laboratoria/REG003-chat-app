import type { NextPage } from "next";
import Header from "../components/Header/Header";
import TabsMenu from "../components/Tabs/tabs";
import ListChat from "../components/List-Chat/ListChat";
import SearchSide from "../components/Search/Search";
import { useEffect, useState } from "react";
//TODO ROUTER
const Chat: NextPage = () => {
  /*   const [channelTitle, setChannelTitle] = useState("holis")
    const [lastMessage, setLastChannel] = useState("tomar agua es bueno")
    const [time, setTime] = useState("10:30") */
  const arrayExample: Array<any> = [];
  const [listChats, setListChats] = useState(arrayExample);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeChannel, setActiveChannel] = useState(true);

  useEffect(() => {
    //TODO PETICION A LA BD DE CANALES DE USUARIO
    const myChannels = [
      {
        channelTitle: "Mis canales",
        lastMessage: "holis",
        time: "10:11",
        id: "1",
      },
      {
        channelTitle: "Aguacate",
        lastMessage: "holas",
        time: "10:00",
        id: "2",
      },
      {
        channelTitle: "Hello ",
        lastMessage: "buenas buenas",
        time: "09:11",
        id: "3",
      },
      {
        channelTitle: "Super team",
        lastMessage: "Hola buenas",
        time: "09:05",
        id: "4",
      },
    ];
    const descubrir = [
      {
        channelTitle: "DESCUBRIR",
        lastMessage: "holis 5",
        time: "10:15",
        id: "1",
      },
      {
        channelTitle: "sugar free",
        lastMessage: "holas",
        time: "10:00",
        id: "2",
      },
      {
        channelTitle: "sunrise",
        lastMessage: "buenas buenas",
        time: "09:11",
        id: "3",
      },
      {
        channelTitle: "Super Super",
        lastMessage: "Hola buenas",
        time: "09:05",
        id: "4",
      },
      {
        channelTitle: "Dance group",
        lastMessage: "Its time to dance",
        time: "09:00",
        id: "56",
      },
    ];

    activeChannel ? setListChats(myChannels) : setListChats(descubrir);
  }, [activeChannel]);

  return (
    <section className="container">
      <Header
        setActiveSearch={setActiveSearch}
        activeSearch={activeSearch}
      ></Header>
      <TabsMenu
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      ></TabsMenu>
      {activeSearch ? <SearchSide></SearchSide> : ""}
      {listChats[0] ? (
        listChats.map((chat) => {
          const { channelTitle, lastMessage, time, id } = chat;
          return (
            <ListChat
              key={id}
              channelTitle={channelTitle}
              lastMessage={lastMessage}
              time={time}
            ></ListChat>
          );
        })
      ) : (
        <p>No te has unido a canales aun </p>
      )}
    </section>
  );
};

export default Chat;
