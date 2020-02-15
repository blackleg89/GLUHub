import React from "react";
import { Menu, Button } from "semantic-ui-react";
import {Link} from 'react-router-dom'
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";

class SidePanel extends React.Component {
  render() {
    const { currentUser} = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{fontSize: "1.2rem"}}
        className="menuUserpanel"
      
      >

      
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser}/>
        <DirectMessages currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
