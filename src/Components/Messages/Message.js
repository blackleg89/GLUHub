import React, {useState, useEffect}  from "react";
import moment from "moment";
import { Comment, Image, Modal, Button} from "semantic-ui-react";
import firebase from '../../firebase'
const Message= ({message, user, admin}) => {
  const [showModal, setModal] = useState(false)
  const [showConfirm, setConfirm] = useState(false)
  const [showBan, setBan] = useState(false)
  
    const isOwnMessage = (message, user) =>{
        return message.user.id === user.uid ? "message__self" : ""
    }

    const isImage = message =>{
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content")
    }

    const timeFromNow = timestamp => moment(timestamp).fromNow()

    const makeAdmin = (message, user, admin) =>{
      if(admin === true){
        firebase.database().ref("users/" + message.user.id).set({
          admin:true
        }).then(alert(`Succesfully made ${message.user.name} admin`))
      }else{
        alert("You don't have enough permission to do this.")
      }
    }

    const banUser = (message, user, admin) =>{
      if(admin === true){
        let userToRemove = firebase.database().ref("users/" + message.user.id)
        admin.auth().deleteUser(userToRemove)
        alert('User succesfully removed')
      }else{
        alert("You don't have enough permission to do this.")
      }
    }


    return (
        <div>
            <Comment>
              <Comment.Avatar src={message.user.avatar} />
              <Comment.Content className={isOwnMessage(message, user)}>
                  <Comment.Author onClick={() => setModal(true)} as="a" >{message.user.name}</Comment.Author>
                  <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
                    {isImage(message) ? (
                    <Image src={message.image} className="message__image" />
                    ) : (
                    <Comment.Text className="message">{message.content}</Comment.Text>
                    )}
                </Comment.Content>
            </Comment>
            <Modal open={showModal} closeIcon onClose={() => setModal(false)}>
                <Modal.Header>
                  {message.user.name}
                </Modal.Header>
                <Modal.Content image>
                  <Image wrapped small size="small" src={message.user.avatar}/>  
                  <Modal.Description>
                      <Button onClick={()=> setConfirm(true)}>Make user Admin</Button>
                      <Button onClick={() => setBan(true)}>Ban user</Button>
                  </Modal.Description>
                </Modal.Content>
            </Modal>
            <Modal open={showConfirm} closeIcon size="mini" onClose ={()=> setConfirm(false)}>
              <Modal.Header>
                Make {message.user.name} admin
              </Modal.Header>
              <Modal.Content>
                <p>Are you sure?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={()=> setConfirm(false)}negative>No</Button>
                <Button onClick={() => makeAdmin(message, user, admin)} positive icon="checkmark" labelPosition="right" content="Yes"/>
              </Modal.Actions>
            </Modal>
            <Modal open={showBan} closeIcon size="mini" onClose={()=> setBan(false)}>
              <Modal.Header>
                Ban {message.user.name} ?
              </Modal.Header>
              <Modal.Content>
                <p>Are you sure?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setBan(false)} negative>No</Button>
                <Button onClick={() => banUser(message, user, admin)} positive icon="checkmark" labelPosition="right" content="Yes"/>
              </Modal.Actions>
            </Modal>
        </div>
    )
}
export default Message