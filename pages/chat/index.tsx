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
  getChannelById,
} from "../../services/channels";
import ModalChannel from "../../components/Modal/ModalChannel";

const Chat: NextPage = () => {
  // @ts-ignore
  const { socket, setSocket } = useContext(SocketContext);

  const [listChats, setListChats] = useState<Array<any>>();
  const [listDiscover, setDiscover] = useState<Array<any>>();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<Array<any>>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const sockets = socket;
    sockets.on("connect", () => {
      console.log("conectado");
    });
    sockets.on("disconnect", () => {
      console.log("disconnect");
    });
  }, []);

  const token = localStorage.getItem("token");
  let uid: any;
  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = window.atob(payload);
    const payloadJSON = JSON.parse(decodedPayload);
    uid = payloadJSON.uid;
  }
  useEffect(() => {
    //TODO PETICION A LA BD DE CANALES DE USUARIo
    if (token) {
      // console.log(payloadJSON.uid)

      getUserChannels(token, uid).then((res) => {
        setListChats(res);
        return res;
      });

      getChannelsToDiscover(token, uid).then((res) => {
        const channels = res.content;
        const channelData = channels.map((channelId: number) =>
          getChannelById(token, channelId).then((res) => res)
        );
        listDiscover
          ? setDiscover([...listDiscover, channelData])
          : setDiscover(channelData);
      });
    }

    // activeChannel
    //   ? setListChats(userChannels)
    //   : setDiscover(channelsToDiscover);
  }, []);

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
            const { name, channelImage, updatedAt, id } = chat.channel;
            return (
              <>
                <ListChat
                  key={id}
                  channelTitle={name}
                  channelImage={channelImage}
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
          console.log(chat);
          const { name, description, channelImage, id } = chat;
          return (
            <>
              <ListDiscover
                key={id}
                channelTitle={name}
                description={description}
                channelImage={channelImage}
                channelId={id}
                token={token}
                userId={uid}
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
