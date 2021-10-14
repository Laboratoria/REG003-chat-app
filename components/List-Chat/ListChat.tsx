import type { NextPage } from "next";
import { Card, Avatar } from 'antd';
import { useRouter } from "next/router";
import React from "react";

const { Meta } = Card;
interface Props {
  channelTitle:String;
  lastMessage: String;
  time: String;
}

const ListChat: NextPage<Props> = ({channelTitle,lastMessage, time}) => {
const router = useRouter();


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