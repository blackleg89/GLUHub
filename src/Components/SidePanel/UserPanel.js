import React from "react";
import firebase from "../../firebase";
import {Link} from 'react-router-dom'

// prettier-ignore

import { Grid, Header, Icon, Image, Modal, Input, Button } from "semantic-ui-react";
class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    usersRef: firebase.database().ref("users"),
    adminRef: firebase.database().ref("users/admin")
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleTest= () => console.log(this.state.adminRef)
  
  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };

  render() {
    const { user, modal } = this.state;

    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <h1>Good day, </h1>
              <h1 className="lmao" onClick={this.openModal}>{user.displayName}</h1>
              <Link className="link-chat" to="/chat"><Button className="button-chat">Chat</Button></Link>
              <Modal open={modal} onClose={this.closeModal}>
                <Modal.Header>Settings for {user.displayName}</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size="small" src={user.photoURL} />
                  <Modal.Description>
                    <Button>Change Avatar</Button>
                    <Button onClick={this.handleSignout}>Sign out</Button>
                    <Button onClick={this.handleTest}>Test</Button>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
              </Modal>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
