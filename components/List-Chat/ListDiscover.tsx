import type { NextPage } from "next";
import { Card, Avatar } from 'antd';
import { useRouter } from "next/router";
import React from "react";

const { Meta } = Card;
interface Props {
  channelTitle: string;
  description: string;
  channelImage: string;
  id: number;
}

const ListDiscover: NextPage<Props> = ({ channelTitle, description, channelImage, id }) => {
  const router = useRouter();

  return (
    <Card className='card-item' bordered={false}>
      <button  className='button-join' onClick={() => console.log('unir al', {id})}> join</button>
      <Meta
        avatar={
          <Avatar src={ channelImage} />
        }
        title={channelTitle}
        description={description}
      />
    </Card>
  );
};
export default ListDiscover;