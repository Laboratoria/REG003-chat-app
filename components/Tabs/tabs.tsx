import { Tabs } from "antd";
import { NextPage } from "next";
interface Props {
  activeChannel: Boolean;
  setActiveChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

const { TabPane } = Tabs;
const TabsMenu: NextPage<Props> = ({ activeChannel, setActiveChannel }) => {
  const activeChannels = () => {
    setActiveChannel(!activeChannel);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={activeChannels}>
      <TabPane tab="Mis Canales" key="1" />
      <TabPane tab="Descubrir" key="2" />
    </Tabs>
  );
};
export default TabsMenu;
