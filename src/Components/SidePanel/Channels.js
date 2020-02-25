import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
// prettier-ignore
import { Menu, Icon, Label, Modal, Form, Input, Button, Dropdown } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    activeChannel: "",
    user: firebase.auth().currentUser,
    channel: null,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    messagesRef: firebase.database().ref("messages"),
    typingRef: firebase.database().ref("typing"),
    notifications: [],
    firstLoad: true,
    admin:false,
    isHovering:false,
    lmao:false,
    activeChannelName: ''
  }; 
  
  isHovering= () => this.setState({isHovering:true})
  isNotHovering= () => this.setState({isHovering:false})

  componentDidMount() {
    this.addListeners();
    var userId = this.state.user.uid;
    firebase
      .database()
      .ref("users/" + userId + "/admin")
      .on("value", snap => {
        if (snap.val() === true) {
          this.setState({admin:true});
        }
      });
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
      this.addNotificationListener(snap.key);
    });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  addNotificationListener = channelId => {
   this.state.messagesRef.child(channelId).on("value", snap => {
      if (this.state.channel) {
        this.handleNotifications(
          channelId,
          this.state.channel.id,
          this.state.notifications,
          snap
        );
      }
    });
  };

  handleNotifications = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0;

    let index = notifications.findIndex(
      notification => notification.id === channelId
    );

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;

        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0
      });
    }

    this.setState({ notifications });
  };

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0];
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
      this.setState({ channel: firstChannel });
    }
    this.setState({ firstLoad: false });
  };



  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.state.typingRef
      .child(this.state.channel.id)
      .child(this.state.user.uid)
      .remove();
    this.clearNotifications();
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
    this.setState({ channel });
  };

  clearNotifications = () => {
    let index = this.state.notifications.findIndex(
      notification => notification.id === this.state.channel.id
    );

    if (index !== -1) {
      let updatedNotifications = [...this.state.notifications];
      updatedNotifications[index].total = this.state.notifications[
        index
      ].lastKnownTotal;
      updatedNotifications[index].count = 0;
      this.setState({ notifications: updatedNotifications });
    }
  };

  deleteChannel = () =>{
    let channelToDelete = firebase.database().ref("channels/" + this.state.activeChannel)
    channelToDelete.remove()
  }


  openLmao= () => this.setState({lmao:true})
  closeLmao =() => this.setState({lmao:false})
  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id, activeChannelName: channel.name });
  };

  getNotificationCount = channel => {
    let count = 0;

    this.state.notifications.forEach(notification => {
      if (notification.id === channel.id) {
        count = notification.count;
      }
    });

    if (count > 0) return count;
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <div>
        <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.name === this.state.activeChannelName}  
          onMouseEnter={this.isHovering}
          onMouseLeave={this.isNotHovering}
        >

          {/* TODO: Needs refactoring */}
          {this.state.admin === true && this.state.isHovering === true && this.state.lmao === false &&  <Icon name="ellipsis vertical" onClick={this.openLmao}/>}
          {this.getNotificationCount(channel) && (
            <Label color="red">{this.getNotificationCount(channel)}</Label>
          )}
          # {channel.name}
            <Modal 
              basic
              open={this.state.lmao} 
              closeIcon 
              onClose={this.closeLmao}
              size="mini"
            >
              <Modal.Header>
                Kanaal opties voor {this.state.activeChannelName}
              </Modal.Header>
              <Modal.Description>
                <Button onClick={this.deleteChannel}>Verwijder kanaal</Button>
              </Modal.Description>
            </Modal>
          
        </Menu.Item>

        
      </div>
  
    ));

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal, lmao, channel } = this.state;
    
    return (
      <React.Fragment>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS 
            </span>{" "}
            ({channels.length})
            {this.state.admin === true && <Icon name="plus" className="add-icon" onClick={this.openModal}/>}
          </Menu.Item>
          {this.displayChannels(channels)} 
        </Menu.Menu>
        <Modal basic open={modal} closeIcon size="small" onClose={this.closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
          </Modal.Actions>
        </Modal> 
        {/* <Modal open={lmao} closeIcon size='small' onClose={this.closeLmao}>
          <Modal.Header>
            Weet je zeker dat je {}  wilt verwijderen?
          </Modal.Header>
        </Modal> */}

      </React.Fragment>

    );
  }
}

export default connect(
  null,
  { setCurrentChannel, setPrivateChannel }
)(Channels);
