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
import { getUserById } from "../../services/user";

const Chat: NextPage = () => {
  // @ts-ignore
  const { socket, setSocket } = useContext(SocketContext);

  const [listChats, setListChats] = useState<Array<any>>();
  const [listDiscover, setDiscover] = useState<Array<any>>();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  let uid: any;
  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = window.atob(payload);
    const payloadJSON = JSON.parse(decodedPayload);
    uid = payloadJSON.uid;
  }
  useEffect(() => {
    const user = getUserById(token, uid).then((data: any) =>
      setCurrentUser(data.content)
    );
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

    async function fetchData() {
      if (token) {
        // console.log(payloadJSON.uid)

        getUserChannels(token, uid).then((res) => {
          setListChats(res);
        });

        const channelsToDiscover = await getChannelsToDiscover(token, uid);
        const channels = channelsToDiscover.content;
        const channelsArr: Array<any> = [];

        for (const channel of channels) {
          const resp = await getChannelById(token, channel);
          console.log('channel receive', resp);
          channelsArr.push(resp);
        }
        console.log('channelsArr', channelsArr);

        setDiscover(channelsArr);

      }
    }
    fetchData();
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
                  currentUser={currentUser}
                  channelTitle={name}
                  channelImage={channelImage}
                  updatedAt={updatedAt}
                  id={id}
                  setListChats={setListChats}
                ></ListChat>
              </>
            );
          })
        ) : (
          <p>No te has unido a canales aun </p>
        )
      ) : listDiscover?.length ? (
        listDiscover.map((chat) => {
          console.log('chat', chat);
          const { name, description, channelImage, id } = chat;
          return (
            <>
              <ListDiscover
                key={id}
                setDiscover={setDiscover}
                setListChats={setListChats}
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
