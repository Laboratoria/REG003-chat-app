import {  Tabs } from 'antd';
import { NextPage } from 'next';

const { TabPane } = Tabs;
const TabsMenu: NextPage = () => {

  return(
<Tabs  defaultActiveKey="1">
<TabPane tab="Mis Canales" key="1" />
<TabPane tab="Descubrir" key="2" />
</Tabs>
)
}
export default TabsMenu