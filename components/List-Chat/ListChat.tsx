import type { NextPage } from "next";
import { Card, Avatar } from 'antd';
import { useRouter } from "next/router";
import { useState } from "react";
const { Meta } = Card;

const ListChat: NextPage = () => {
const router = useRouter();
//TODO ESTOS ESTADOS SERIAN PROPS QUE RECIBIRA DEL PADRE
const  [channelTitle, setChannelTitle]=useState("holis")
const [lastMessage, setLastChannel] =useState("tomar agua es bueno")
const [time, setTime] =useState("10:30")

  return (
    <>
    <Card className="card-item" bordered={false}>
      <p className="time">{time}</p>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={channelTitle}
            description={lastMessage}
          />
        </Card>
        <Card className="card-item" bordered={false} >
        <p className="time">{time}</p>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={channelTitle}
          description={lastMessage}
        
        />
      </Card>
      </>
  );
};
export default ListChat;