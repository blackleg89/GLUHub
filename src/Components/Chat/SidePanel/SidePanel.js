import React from "react";
import { Menu, Button } from "semantic-ui-react";
import {Link} from 'react-router-dom'
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

class SidePanel extends React.Component {
  render() {
    const { currentUser} = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser} />
        <Starred currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
        <Link className="link-app" to="/"><Button className="button-app">Return to Hub</Button></Link>
      </Menu>
    );
  }
}

export default SidePanel;
