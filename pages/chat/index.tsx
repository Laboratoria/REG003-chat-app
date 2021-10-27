import type { NextPage } from "next";
import Header from "../../components/Header/Header";
import TabsMenu from "../../components/Tabs/tabs";
import ListChat from "../../components/List-Chat/ListChat";
import SearchSide from "../../components/Search/Search";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/socketContext";
import ListDiscover from "../../components/List-Chat/ListDiscover";


const Chat: NextPage = () => {
  // @ts-ignore
  const { socket, setSocket } = useContext(SocketContext);


  const [listChats, setListChats] = useState<Array<any>>();
  const [listDiscover, setDiscover] = useState<Array<any>>();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<boolean>(true);


  useEffect(() => {
    const sockets = socket;
    sockets.on("connect", () => {
      console.log('conectado');
    })
    sockets.on("disconnect", () => {

  }, [])


  useEffect(() => {
    //TODO PETICION A LA BD DE CANALES DE USUARIo
    const myChannels = [
      {
        channelTitle: "Mis canales",
        lastMessage: "holis",
        time: "10:11",
        id: 1,
      },
      {
        channelTitle: "Aguacate",
        lastMessage: "holas",
        time: "10:00",
        id: 2,
      },
      {
        channelTitle: "Hello ",
        lastMessage: "buenas buenas",
        time: "09:11",
        id: 3,
      },
      {
        channelTitle: "Super team",
        lastMessage: "Hola buenas",
        time: "09:05",
        id: 4,
      },
    ];
    const descubrir = [
      {
        channelTitle: "DESCUBRIR",
        description: "holis 5",
        time: "10:15",
        id: 1,
      },
      {
        channelTitle: "sugar free",
        description: "holas",
        time: "10:00",
        id: 2,
      },
      {
        channelTitle: "sunrise",
        description: "buenas buenas",
        time: "09:11",
        id: 3,
      },
      {
        channelTitle: "Super Super",
        lastMessage: "Hola buenas",
        time: "09:05",
        id: 4,
      },
      {
        channelTitle: "Dance group",
        lastMessage: "Its time to dance",
        time: "09:00",
        id: 56,
      },
    ];

    activeChannel ? setListChats(myChannels) : setDiscover(descubrir);
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
      {activeChannel ?
        listChats?.length ? (
          listChats.map((chat) => {
            const { channelTitle, lastMessage, time, id } = chat;
            return (
              <ListChat
                key={id}
                channelTitle={channelTitle}
                lastMessage={lastMessage}
                time={time}
                id={id}
              ></ListChat>
            );
          })
        ) : (
          <p>No te has unido a canales aun </p>
        ) : listDiscover?.length ? (
          listDiscover.map((chat) => {
            const { channelTitle, description, channelImage, id } = chat;
            return (
              <ListDiscover
                key={id}
                channelTitle={channelTitle}
                description={description}
                channelImage={channelImage}
                id={id}
              ></ListDiscover>
            );
          })
        ) : (
          <p>No te has unido a canales aun </p>
        )
      }
    </section>
  );
};

export default Chat;
