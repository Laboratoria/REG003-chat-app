import type { NextPage } from 'next';
import { Card, Avatar } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { postUserChannels } from '../../services/channelUser'
import { getChannelsToDiscover, getChannelById, getUserChannels } from '../../services/channels'

const { Meta } = Card;
interface Props {
  channelTitle: string;
  description: string;
  channelImage: string;
  channelId: number;
  token: any
  userId: number
  setDiscover: any
  setListChats: any
}


const ListDiscover: NextPage<Props> = ({ channelTitle, description, channelImage, token, userId, channelId, setDiscover, setListChats }) => {
  const router = useRouter();

  return (
    <Card className='card-item' bordered={false}>
      <button className='button-join' onClick={async () => {
        postUserChannels(token, userId, channelId)
        getUserChannels(token, userId).then((res) => {
          setListChats(res);
        });
        const channelsToDiscover = await getChannelsToDiscover(token, userId);
        const channels = channelsToDiscover.content;
        const channelsArr: Array<any> = [];

        for (const channel of channels) {
          const resp = await getChannelById(token, channel);
          channelsArr.push(resp);
        }

        setTimeout(() => { setDiscover(channelsArr); }, 2000)

      }}> join</button>
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