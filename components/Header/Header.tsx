import React, { useContext } from "react";
import type { NextPage } from "next";
import { PageHeader, Menu, Dropdown, Button } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { SocketContext } from "../../contexts/socketContext";

interface Props {
  setActiveSearch: React.Dispatch<React.SetStateAction<boolean>>;
  activeSearch: boolean;
}

const Header: NextPage<Props> = ({ setActiveSearch, activeSearch }) => {
  const router = useRouter();
  // @ts-ignore
  const { InitialSocket } = useContext(SocketContext);
  console.log(InitialSocket);
  const toggleSearch = () => {
    setActiveSearch(!activeSearch);
  };
  const logOut = () => {
    localStorage.clear();
  };
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <p>Perfil</p>
      </Menu.Item>
      <Menu.Item key="new-chanels">
        <p>Crear Canales</p>
      </Menu.Item>
      <Menu.Item key="logout">
        {/* onClick={InitialSocket.disconnectSocket} */}
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
