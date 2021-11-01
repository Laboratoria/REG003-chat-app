import type { NextPage } from 'next';
import React, { useState, useContext, useEffect } from 'react';
import CommentChat from '../../components/Comment/Comment';
import HeaderChat from '../../components/Header_chat/HeaderChat'
import SendMessage from '../../components/SendMessage/SendMessage';


const Home: NextPage = () => {
  const [messages, setMessages] = useState<Array<any>>([])
  const token = localStorage.getItem('token');
  const channelId = window.location.pathname.replace('/chat/', '')
  let uid: any;
  if (token) {
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);
    const payloadJSON = JSON.parse(decodedPayload);
    uid = payloadJSON.uid;
  }
  useEffect(() => {
    setMessages([
      { userId: 11, id: 2, body: 'skdfbakdnsjaksdnc kajsdnckajsdckasndckasd', attachment: 'https://joeschmoe.io/api/v1/random', createdAt: '10-20-30', },
      {
        userId: 1, id: 3, body: 'skdfbakdnsjaksdnc kajsdnckajsdckasndckasd',
        createdAt: '10-11-30',
      }
    ])
  }, [])
  return (
    <div className='container'>
      <HeaderChat token={token} uid={uid} channelId={Number(channelId)}></HeaderChat>
      {messages[0] ? messages.map(({ userId, id, body, attachment, createdAt, }) => {

        return <CommentChat key={id} userName={userId} body={body} time={createdAt} attachment={attachment}></CommentChat>
      }
      ) : <p>you dont have any message</p>
      }

      <SendMessage></SendMessage>
    </div>
  );
};

export default Home;
