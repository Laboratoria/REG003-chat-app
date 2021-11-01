import type { NextPage } from 'next';
import { Card, Avatar } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { postUserChannels } from '../../services/channelUser'

const { Meta } = Card;
interface Props {
  channelTitle: string;
  description: string;
  channelImage: string;
  channelId: number;
  token: any
  userId:number
}


const ListDiscover: NextPage<Props> = ({ channelTitle, description, channelImage,token, userId, channelId }) => {
  const router = useRouter();

  return (
    <Card className='card-item' bordered={false}>
      <button className='button-join' onClick={() => postUserChannels(token, userId, channelId)}> join</button>
      <Meta
        avatar={
          <Avatar src={channelImage} />
        }
        title={channelTitle}
        description={description}
      />
    </Card>
  );
};
export default ListDiscover;