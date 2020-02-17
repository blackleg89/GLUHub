import React, {useState}  from "react";
import moment from "moment";
import { Comment, Image, Modal} from "semantic-ui-react";

const Message= ({message, user}) => {

    const [showModal, setModal] = useState(false)

    const isOwnMessage = (message, user) =>{
        return message.user.id === user.uid ? "message__self" : ""
    }

    const isImage = message =>{
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content")
    }



    const timeFromNow = timestamp => moment(timestamp).fromNow()

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
            <Modal open={showModal} basic closeIcon size="mini" onClose={() => setModal(false)}>
              <Modal.Content>
                <Modal.Header>
                  {message.user.name}
                </Modal.Header>
                <Modal.Content image>
                  <Image wrapped small size="small" src={message.user.avatar}/>
                </Modal.Content>
                <Modal.Description>
                  Lmao
                </Modal.Description>
              </Modal.Content>
            </Modal>
        </div>
    )
}

export default Message