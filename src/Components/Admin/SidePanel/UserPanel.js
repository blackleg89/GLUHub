import React from "react";
import firebase from "../../../firebase";
import {Link} from 'react-router-dom'
import Channels from './Channels'
// prettier-ignore

import { Grid, Header, Button, Modal, Image, Menu, Icon} from "semantic-ui-react";
class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    channels: [],
    channelsRef: firebase.database().ref("channels"),
    usersRef: firebase.database().ref("users"),
    open:false
  };
  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }


  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels });
    });
  };

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };



  removeListeners = () => {
    this.state.channelsRef.off();
  };


  openModal = () => this.setState({modal:true})
  closeModal = () => this.setState({modal:false})
  openModalTwo = () => this.setState({open:true})
  closeModalTwo = () => this.setState({open:false})



  render() {
    const { user, modal, channels } = this.state
    const channel = channels.map(function(item, i){
      return<li className="hehexd" key={i}>{item.name}</li>
    })


    return (
        <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <h1>Welcome, </h1>
              <h1 className="lmao" onClick={this.openModal}>{user.displayName}</h1>
            </Header>
            <Modal open={modal} onClose={this.closeModal}>
              <Modal.Header>Admin settings for {user.displayName}</Modal.Header>
              <Modal.Content image>
                <Image wrapped small size="small" src={user.photoURL} />
                <Modal.Description>
                  <Link to="/"><Button>Return to chat</Button></Link>
                  <Button onClick={this.handleSignout}>Sign out</Button>
                  <Channels currentUser={this.props.currentUser}/>
                  <Button onClick={this.openModalTwo}>Delete channel</Button>
                  <Link to="/adminregister"><Button>Make user Admin</Button></Link> 
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Modal open={this.state.open} onClose={this.closeModalTwo}>
              <Modal.Header>Select which channel to delete</Modal.Header>  
              <Modal.Content>
                  <ul>
                    {channel}
                  </ul>
              </Modal.Content>
            </Modal> 
          </Grid.Row>
        </Grid.Column>
      </Grid>


    );
  }
}

export default UserPanel;
