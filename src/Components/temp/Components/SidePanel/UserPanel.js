import React from "react";
import firebase from "../../../../firebase";
// prettier-ignore
import { Grid, Header, Icon,  Image, Modal, Button , Message, Input} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from 'axios'
class UserPanel extends React.Component {
  state = {
    user: firebase.auth().currentUser,
    modal: false,
    usersRef: firebase.database().ref("users"),
    admin: false,
    userRef: firebase.auth().currentUser,
    storageRef: firebase.storage().ref(),
    hover:false
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
  startedHover = () => this.setState({hover: true})
  stoppedHover = () => this.setState({hover:false})
  componentDidMount() {
    var userId = this.state.user.uid;
    firebase
      .database()
      .ref("users/" + userId + "/admin")
      .on("value", snap => {
        if (snap.val() === true) {
          this.setState({ admin: true });
        }
      });

    if(this.state.user != null){
      this.state.user.providerData.forEach(profile =>{
        this.state.user.updateProfile({
          displayName: profile.displayName,
          email: profile.email,
          photoURL: profile.photoURL,
          provider: profile.provider
        })
      })
    }
  }

 

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };



  render() {
    const {
      user,
      modal,
    } = this.state;

    return (
      <Grid style={{ background: "#000"}}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0}}>
            {/* App Header */}
            <Header inverted floated="left"as="h2">
              <Icon name="github alternate" />
              <Header.Content color="white">GLU-Git</Header.Content>
            </Header>

            {/* User Dropdown  */}
            <Header  as="h3" inverted style={{paddingTop:"50px"}}>
              <span className="span-gitpanel">
                <Image src={user.photoURL} spaced="right" avatar />
                {user.displayName}
              </span>
              <Icon
                loading = {this.state.hover}
                onMouseEnter={this.startedHover}
                onMouseLeave={this.stoppedHover}
                name="setting"
                size="small"
                className="setting-user"
                spaced="right"
                style={{ display: "inline-block" }}
                onClick={this.openModal}
              />
            </Header>
          </Grid.Row>
          <Modal open={modal} closeIcon basic onClose={this.closeModal}>
            <Modal.Header>Settings for {user.displayName}</Modal.Header>
            <Modal.Content image>
              <Image src={user.photoURL} wrapped size="small" spaced="left"/>
              <Modal.Description>
                <Link to="/">
                  <Button animated>
                    <Button.Content visible>Chat</Button.Content>
                    <Button.Content hidden>
                      <Icon name="chat"/>
                    </Button.Content>
                  </Button>
                </Link> 
                <Button animated onClick={this.handleSignout}>
                  <Button.Content visible>Sign out</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right"/>
                  </Button.Content>
                </Button>
                <Button animated href="https://discord.gg/hfhT2HV" target="_blank">
                  <Button.Content visible>Support</Button.Content>
                  <Button.Content hidden>
                    <Icon name="discord"/>
                  </Button.Content>
                </Button> 
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
