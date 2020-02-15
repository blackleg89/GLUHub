import React from "react";
import { Menu, Button,Dropdown } from "semantic-ui-react";
import UserPanel from "./Userpanel";
import axios from 'axios'
import firebase from '../../../../firebase'
class SidePanel extends React.Component {
  state = {
    user: firebase.auth().currentUser,
    email: '',
    photoURL: ''
  }

  render() {

    const { currentUser} = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{fontSize: "1.2rem"}}
      >
        <UserPanel currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
