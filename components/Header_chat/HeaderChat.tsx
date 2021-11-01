import type { NextPage } from 'next';
import { PageHeader, Menu, Dropdown, Button } from 'antd';
import { MoreOutlined, } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { deleteChannelUser } from '../../services/channelUser'
import channelId from '../../pages/api/channel/[id]';


interface Props {
  token: any,
  uid: number,
  channelId: number

}
const HeaderChat: NextPage<Props> = ({token, uid, channelId}) => {
  const channelName = 'labo'
  const router = useRouter();
  const goOut = ()=>{
    const channel= deleteChannelUser(token, uid, channelId)
    router.push('/chat')
    return channel
  }

  const menu = (
    <Menu>
      <Menu.Item key='settings'>
        <p>Ajustes</p>
      </Menu.Item>
      <Menu.Item key='getOut' onClick={goOut} >
        <p> Salir del Chat</p>
      </Menu.Item>
    </Menu>
  );
  const DropdownMenu = () => (
    <Dropdown key='more' overlay={menu}>
      <Button
        style={{
          border: 'none',
          padding: 0,
        }}
      >
        <MoreOutlined
          style={{
            fontSize: 25,
            verticalAlign: 'top',
          }}
        />
      </Button>
    </Dropdown>
  );
  return (
    <>
      <PageHeader
        title={channelName}
        onBack={() => router.push('/chat')}
        className='site-page-header'
        extra={[
          <DropdownMenu key='more' />,
        ]}
        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
      ></PageHeader>
    </>
  );
};
export default HeaderChat;
