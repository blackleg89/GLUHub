import React from "react";
import firebase from "../../../firebase";
import {Link} from 'react-router-dom'

// prettier-ignore

import { Grid, Header, Image, Modal, Button, Message } from "semantic-ui-react";
class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    usersRef: firebase.database().ref("users"),

  };
  
  openModal = () => this.setState({modal:true})
  closeModal = () => this.setState({modal:false})

  render() {
    const { user, modal } = this.state
    return (
        <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <h1>Welcome, </h1>
              <h1 className="lmao" onClick={this.openModal}>{user.displayName}</h1>
              <Link to="/"><Button>Return to chat</Button></Link>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>


    );
  }
}

export default UserPanel;
