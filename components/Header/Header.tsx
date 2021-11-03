import React, { useContext, useState } from "react";
import type { NextPage } from "next";
import { PageHeader, Menu, Dropdown, Button } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { SocketContext } from "../../contexts/socketContext";

interface Props {
  setActiveSearch: React.Dispatch<React.SetStateAction<boolean>>;
  activeSearch: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
}

const Header: NextPage<Props> = ({
  setActiveSearch,
  activeSearch,
  isModalVisible,
  setIsModalVisible,
}) => {
  const router = useRouter();

  // @ts-ignore
  const { connectSocket, disconnectSocket, socket, setSocket } =
    useContext(SocketContext);

  const toggleSearch = () => {
    setActiveSearch(!activeSearch);
  };
  const logOut = () => {
    localStorage.clear();
    const disconnet = disconnectSocket();
    setSocket(disconnet);
    console.log(socket);
    router.push("/");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <p>Perfil</p>
      </Menu.Item>
      <Menu.Item key="new-chanels" onClick={showModal}>
        <p>Crear Canales</p>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logOut}>
        <p> Cerrar Sesión</p>
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
        title="Chat-app"
        className="site-page-header"
        extra={[
          <SearchOutlined
            style={{
              fontSize: 25,
              verticalAlign: "top",
            }}
            onClick={toggleSearch}
            key="search"
          />,
          <DropdownMenu key="more" />,
        ]}
      ></PageHeader>
    </>
  );
};
export default Header;
