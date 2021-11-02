import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import CommentChat from "../../components/Comment/Comment";
import HeaderChat from "../../components/Header_chat/HeaderChat";
import SendMessage from "../../components/SendMessage/SendMessage";
import { SocketContext } from "../../contexts/socketContext";
import { getChannelMessages } from "../../services/message";

const Home: NextPage = () => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const token = localStorage.getItem("token");
  const { query } = useRouter();
  const { socket, setSocket } = useContext(SocketContext);
  let uid: any;

  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = window.atob(payload);
    const payloadJSON = JSON.parse(decodedPayload);
    uid = payloadJSON.uid;
  }

  useEffect(() => {
    token
      ? getChannelMessages(token, Number(query.id)).then((res) => {
          setMessages(res.content);
        })
      : "No token provided";
    socket.on("send-message", (payload: any) => {
      messages.push(payload);
      console.log(messages);
      setMessages([...messages, payload]);
    });
  }, []);

  return (
    <div className="container">
      <HeaderChat
        token={token}
        channelId={Number(query.id)}
        uid={Number(uid)}
        channelName={String(query.channel)}
      ></HeaderChat>
      {messages[0] ? (
        messages.map(({ userId, id, body, attachment, createdAt }) => {
          return (
            <CommentChat
              key={id}
              userName={userId}
              body={body}
              time={createdAt}
              attachment={attachment}
            ></CommentChat>
          );
        })
      ) : (
        <p>you dont have any message</p>
      )}

      <SendMessage
        channelId={Number(query.id)}
        uid={Number(uid)}
        // channelId={query.id ? Number(query.id) : 1}
        // userId={uid}
      ></SendMessage>
    </div>
  );
};

export default Home;
