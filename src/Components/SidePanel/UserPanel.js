import React from "react";
import firebase from "../../firebase";
import AvatarEditor from "react-avatar-editor";
// prettier-ignore
import { Grid, Header, Icon, Menu, Item, Image, Modal, Button , Message, Input, Label, Card} from "semantic-ui-react";
import { Link } from "react-router-dom";
class UserPanel extends React.Component {
  state = {
    user: firebase.auth().currentUser,
    currentUser: firebase.auth().currentUser,
    modal: false,
    usersRef: firebase.database().ref("users"),
    admin: false,
    moderator: false,
    lmao: false,
    git: false,
    uploadedCroppedImage: "",
    previewImage: "",
    croppedImage: "",
    blob: null,
    userRef: firebase.auth().currentUser,
    storageRef: firebase.storage().ref(),
    gitName: "",
    gitEmail: "",
    gitUID: "",
    isHovering: false,
    metadata: {
      contentType: "image/png"
    }
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
  openLmao = () => this.setState({ lmao: true });
  closeLmao = () => this.setState({ lmao: false });
  openGit = () => this.setState({ git: true });
  closeGit = () => this.setState({ git: false });
  onHover = () => this.setState({ isHovering: true });
  stoppedHover = () => this.setState({ isHovering: false });
  componentDidMount() {
    var userId = this.state.user.uid;
    var currentUser = this.state.currentUser
    firebase
      .database()
      .ref("users/" + userId + "/admin")
      .on("value", snap => {
        if (snap.val() === true) {
          this.setState({ admin: true });
        }
        if(currentUser.providerData[0].providerId === "github.com"){        
          firebase.database().ref("users/" + currentUser.uid).set({
            name:this.state.user.displayName,
            admin:this.state.admin
          })
        }
      })
  }

  uploadCroppedImage = () => {
    const { storageRef, userRef, blob, metadata } = this.state;

    storageRef
      .child(`avatars/users/${userRef.uid}`)
      .put(blob, metadata)
      
      .then(snap => {
        snap.ref.getDownloadURL().then(downloadURL => {
          this.setState({ uploadedCroppedImage: downloadURL }, () =>
            this.changeAvatar()
          );
        });
      });
  };

  changeAvatar = () => {
    this.state.userRef
      .updateProfile({
        photoURL: this.state.uploadedCroppedImage
      })
      .then(() => {
        console.log("PhotoURL updated");
        this.closeLmao();
      })
      .catch(err => {
        console.error(err);
      });

    this.state.usersRef
      .child(this.state.user.uid)
      .update({ avatar: this.state.uploadedCroppedImage })
      .then(() => {
        console.log("User avatar updated");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    }
  };

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
      lmao,
      previewImage,
      croppedImage,
      currentUser
    } = this.state;
    const { primaryColor } = this.props;

    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}

            <Header inverted floated="left" as="h2">
              <Icon name="chat" />
              <Header.Content color="white">GLU-Chat</Header.Content>
            </Header>

            {/* User Dropdown  */}
            <label className="label_username">
              {/* <Image src={user.photoURL} avatar /> */}
              {user.displayName}
              <Icon
                onMouseEnter={this.onHover}
                onMouseLeave={this.stoppedHover}
                loading={this.state.isHovering === true}
                name="setting"
                size="small"
                style={{
                  float: "right",
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "0px"
                }}
                className="setting-user"
                onClick={this.openModal}
              />
            </label>
          </Grid.Row>
          <Modal open={modal} onClose={this.closeModal} size="small" closeIcon>
            <Modal.Header>Settings for {user.displayName}</Modal.Header>
            <Modal.Content image>
              <Image
                className="avatar-us"
                onClick={this.openLmao}
                size="small"
                src={user.photoURL}
              />
              <Modal.Description>
                <Button animated onClick={this.handleSignout}>
                  <Button.Content visible>Sign out</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
                <Button onClick={this.openLmao} animated>
                  <Button.Content visible>Avatar</Button.Content>
                  <Button.Content hidden>
                    <Icon name="picture" />
                  </Button.Content>
                </Button>
                {this.state.admin === true ? <Message>Admin</Message> : null}
                {currentUser.providerData[0].providerId === "github.com" && (
                  <Link to="/uwu">
                    <Button animated>
                      <Button.Content visible>Glu-Git</Button.Content>
                      <Button.Content hidden>
                        <Icon name="github" />
                      </Button.Content>
                    </Button>
                  </Link>
                )}
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Modal open={lmao} onClose={this.closeLmao}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input
                onChange={this.handleChange}
                fluid
                type="file"
                label="New Avatar"
                name="previewImage"
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                    {previewImage && (
                      <AvatarEditor
                        ref={node => (this.avatarEditor = node)}
                        image={previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.2}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column>
                    {croppedImage && (
                      <Image
                        style={{ margin: "3.5em auto" }}
                        width={100}
                        height={100}
                        src={croppedImage}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {croppedImage && (
                <Button
                  color="green"
                  inverted
                  onClick={this.uploadCroppedImage}
                >
                  <Icon name="save" /> Change Avatar
                </Button>
              )}
              <Button color="green" inverted onClick={this.handleCropImage}>
                <Icon name="image" /> Preview
              </Button>
              <Button color="red" inverted onClick={this.closeLmao}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
