import type { NextPage } from "next";
import { Card, Avatar } from "antd";
import { useRouter } from "next/router";
import React from "react";

const { Meta } = Card;
interface Props {
  channelTitle: string;
  lastMessage: string;
  updatedAt: string;
  id: number;
}

const ListChat: NextPage<Props> = ({
  channelTitle,
  lastMessage,
  updatedAt,
  id,
}) => {
  const updatedAtDay = updatedAt.split("T")[0];
  const updatedAtTime = updatedAt.split("T")[1].slice(0, -5);
  const router = useRouter();

  return (
    <Card
      className="card-item"
      bordered={false}
      onClick={() =>
        router.push(
          {
            pathname: `/chat/${id}`,
            query: { channel: channelTitle },
          }
          // pathname: `/chat/${id}`,
        )
      }
    >
      <p className="time">{updatedAtDay}</p>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={channelTitle}
        description={lastMessage}
      />
    </Card>
  );
};
export default ListChat;
