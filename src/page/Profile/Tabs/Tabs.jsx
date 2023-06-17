import { Tab, Tabs } from 'react-bootstrap';
import Activity from './ActivityTab';
import Biography from './Biography.jsx';

const TabMenu = () => {
    return <div className="profile-tabs">
    <Tabs defaultActiveKey="Activity">
      <Tab eventKey="Activity" title="Activity">
        <Activity />
      </Tab>
      <Tab eventKey="Biography" title="Biography">
        <Biography />
      </Tab>
    </Tabs>
  </div>
}

export default TabMenu;