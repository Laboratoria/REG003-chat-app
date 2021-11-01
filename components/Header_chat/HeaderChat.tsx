import React from "react";
import type { NextPage } from "next";
import { PageHeader, Menu, Dropdown, Button } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface Props {
  channelName: string;
}

const HeaderChat: NextPage<Props> = ({ channelName }) => {
  // const channelName = "labo";
  const router = useRouter();

  const menu = (
    <Menu>
      <Menu.Item key="settings">
        <p>Ajustes</p>
      </Menu.Item>
      <Menu.Item key="showUsers">
        <p>Ver Usuarios</p>
      </Menu.Item>
      <Menu.Item key="getOut">
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
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
      ></PageHeader>
    </>
  );
};
export default HeaderChat;
