import type { NextPage } from "next";
import { PageHeader, Menu, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { deleteChannelUser } from "../../services/channelUser";
import { getUserChannels } from "../../services/channels";
import { SocketContext } from "../../contexts/socketContext";
import { useContext } from "react";

interface Props {
  channelName: string;
  channelImage: string;
  token: any;
  uid: number;
  channelId: number;
}

const HeaderChat: NextPage<Props> = ({
  channelName,
  token,
  uid,
  channelId,
  channelImage,
}) => {
  const { setListChats } = useContext(SocketContext);

  const router = useRouter();
  const goOut = async () => {
    const channel = await deleteChannelUser(token, uid, channelId);
    const userChannels = await getUserChannels(token, uid);
    setListChats(userChannels);
    router.push("/chat");
    return channel;
  };

  const menu = (
    <Menu>
      <Menu.Item key="settings">
        <p>Ajustes</p>
      </Menu.Item>
      <Menu.Item key="getOut" onClick={goOut}>
        <p> Salir del Chat</p>
      </Menu.Item>
    </Menu>
  );
  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: "none",
          padding: 0,
        }}
      >
        <MoreOutlined
          style={{
            fontSize: 25,
            verticalAlign: "top",
          }}
        />
      </Button>
    </Dropdown>
  );
  return (
    <>
      <PageHeader
        title={channelName}
        onBack={() => router.push("/chat")}
        className="site-page-header"
        extra={[<DropdownMenu key="more" />]}
        avatar={{
          src: channelImage,
        }}
      ></PageHeader>
    </>
  );
};
export default HeaderChat;
