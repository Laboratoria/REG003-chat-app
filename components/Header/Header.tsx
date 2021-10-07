import type { NextPage } from "next";
import { PageHeader, Menu, Dropdown, Button, } from 'antd';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";


const Header: NextPage = () => {
  const router = useRouter();
  const menu = (
    <Menu>
      <Menu.Item>
        <p>
          perfil
        </p>
      </Menu.Item>
      <Menu.Item>
        <p>
          crear canales
        </p>
      </Menu.Item>
      <Menu.Item>
        <p> cerrar Sesión</p>
      </Menu.Item>
    </Menu>
  );
  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu}>
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
    </Dropdown>);


  return (
    <>
  <PageHeader
    title="Chat-app"
    className="site-page-header"
    extra={[
    <SearchOutlined style={{
      fontSize: 25,
      verticalAlign: 'top',
    }}  key="search"/>,
    <DropdownMenu key="more" />,
    ]}
  >
  </PageHeader>,
    </>
  );
};
export default Header;
