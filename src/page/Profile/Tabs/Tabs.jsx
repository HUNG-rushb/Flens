import { Tab, Tabs } from 'react-bootstrap';
import Activity from './ActivityTab.jsx';
import Portfoio from './Portfolio.jsx'
import Biography from './Biography.jsx';

const TabMenu = () => {
    return <div className="profile-tabs">
    <Tabs defaultActiveKey="Activity">
      <Tab eventKey="Activity" title="Activity">
        <Activity />
      </Tab>
      <Tab eventKey="Portfolio" title="Portfolio">
        <Portfoio />
      </Tab>
      <Tab eventKey="Biography" title="Biography">
        <Biography />
      </Tab>
    </Tabs>
  </div>
}

export default TabMenu;