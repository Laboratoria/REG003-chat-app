import type { NextPage } from "next";
import Header from "../../components/Header/Header";
import TabsMenu from "../../components/Tabs/tabs";
import ListChat from "../../components/List-Chat/ListChat";
import SearchSide from "../../components/Search/Search";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/socketContext";
import ListDiscover from "../../components/List-Chat/ListDiscover";
import {
  getUserChannels,
  getChannelsToDiscover,
} from "../../services/channels";
import ModalChannel from "../../components/Modal/ModalChannel";

const Chat: NextPage = () => {
  // @ts-ignore
  const { socket, setSocket } = useContext(SocketContext);

  const [listChats, setListChats] = useState<Array<any>>();
  const [listDiscover, setDiscover] = useState<Array<any>>();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<boolean>(true);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const sockets = socket;
    console.log(sockets);
    sockets.on("connect", () => {
      console.log("conectado");
    });
    sockets.on("disconnect", () => {
      console.log("disconnect");
    });
  }, []);

  useEffect(() => {
    //TODO PETICION A LA BD DE CANALES DE USUARIo
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = window.atob(payload);
      const payloadJSON = JSON.parse(decodedPayload);
      const uid = payloadJSON.uid;
      // console.log(payloadJSON.uid)

      getUserChannels(token, uid).then((res) => {
        console.log(res);
        setListChats(res);
        return res;
      });

      getChannelsToDiscover(token, uid).then((res) => {
        setDiscover(res.content);
        const channelsToDiscover = res;
        return channelsToDiscover;
      });
    }

    // activeChannel
    //   ? setListChats(userChannels)
    //   : setDiscover(channelsToDiscover);
  }, [activeChannel]);

  return (
    <section className="container">
      <Header
        setActiveSearch={setActiveSearch}
        activeSearch={activeSearch}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      ></Header>
      <TabsMenu
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      ></TabsMenu>
      <ModalChannel
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
      {activeSearch ? <SearchSide></SearchSide> : ""}
      {activeChannel ? (
        listChats?.length ? (
          listChats.map((chat) => {
            const { name, lastMessage, updatedAt, id } = chat.channel;
            return (
              <>
                <ListChat
                  key={id}
                  channelTitle={name}
                  lastMessage={lastMessage}
                  updatedAt={updatedAt}
                  id={id}
                ></ListChat>
              </>
            );
          })
        ) : (
          <p>No te has unido a canales aun </p>
        )
      ) : listDiscover?.length ? (
        listDiscover.map((chat) => {
          const { name, description, channelImage, id } = chat.channel;
          return (
            <>
              <ListDiscover
                key={id}
                channelTitle={name}
                description={description}
                channelImage={channelImage}
                id={id}
              ></ListDiscover>
            </>
          );
        })
      ) : (
        <p>No te has unido a canales aun </p>
      )}
    </section>
  );
};

export default Chat;
