// import React, {Component} from 'react'
// import { Button, Icon, Modal, Grid, Input } from 'semantic-ui-react'
// import AvatarEditor from 'react-avatar-editor'
// import firebase from '../../firebase'
// class AvatarModal extends Component{
//     state = { 
//         open: false,
//         previewImage: "",
//         croppedImage: "",
//         blob: null,
//         uploadedCroppedImage: "",
//         storageRef: firebase.storage().ref(),
//         userRef: firebase.auth().currentUser,
//         usersRef: firebase.database().ref("users"),
//         metadata: {
//           contentType: "image/jpeg"
//         }
//     }

//     open = () => this.setState({ open: true })
//     close = () => this.setState({ open: false })
    
//     uploadCroppedImage = () => {
//         const { storageRef, userRef, blob, metadata } = this.state;
    
//         storageRef
//           .child(`avatars/users/${userRef.uid}`)
//           .put(blob, metadata)
//           .then(snap => {
//             snap.ref.getDownloadURL().then(downloadURL => {
//               this.setState({ uploadedCroppedImage: downloadURL }, () =>
//                 this.changeAvatar()
//               );
//             });
//           });
//       };
    
//       changeAvatar = () => {
//         this.state.userRef
//           .updateProfile({
//             photoURL: this.state.uploadedCroppedImage
//           })
//           .then(() => {
//             console.log("PhotoURL updated");
//             this.closeModal();
//           })
//           .catch(err => {
//             console.error(err);
//           });
    
//         this.state.usersRef
//           .child(this.state.user.uid)
//           .update({ avatar: this.state.uploadedCroppedImage })
//           .then(() => {
//             console.log("User avatar updated");
//           })
//           .catch(err => {
//             console.error(err);
//           });
//       };
    
//       handleChange = event => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
    
//         if (file) {
//           reader.readAsDataURL(file);
//           reader.addEventListener("load", () => {
//             this.setState({ previewImage: reader.result });
//           });
//         }
//       };
    
//       handleCropImage = () => {
//         if (this.avatarEditor) {
//           this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
//             let imageUrl = URL.createObjectURL(blob);
//             this.setState({
//               croppedImage: imageUrl,
//               blob
//             });
//           });
//         }
//       };

//     render() {
//         const { open, previewImage, croppedImage} = this.state

//         return (
//             <Modal
//                 open={open}
//                 onOpen={this.open}
//                 onClose={this.close}
//                 size='small'
//                 trigger={
//                     <Button primary icon>
//                         Change avatar 
//                     </Button>
//                 }
//             >
//                 <Modal.Header>Change avatar</Modal.Header>
//                 <Modal.Content>
//                     <Input
//                         onChange={this.handleChange}
//                         fluid
//                         type="file"
//                         label="New Avatar"
//                         name="previewImage"
//                     />
//                     <Grid centered stackable columns={2}>
//                         <Grid.Row centered>
//                         <Grid.Column className="ui center aligned grid">
//                             {previewImage && (
//                             <AvatarEditor
//                                 ref={node => (this.avatarEditor = node)}
//                                 image={previewImage}
//                                 width={120}
//                                 height={120}
//                                 border={50}
//                                 scale={1.2}
//                             />
//                             )}
//                         </Grid.Column>
//                         <Grid.Column>
//                             {croppedImage && (
//                             <Image
//                                 style={{ margin: "3.5em auto" }}
//                                 width={100}
//                                 height={100}
//                                 src={croppedImage}
//                             />
//                             )}
//                         </Grid.Column>
//                         </Grid.Row>
//                     </Grid>
//                 </Modal.Content>
//                 <Modal.Actions>
//                 {croppedImage && (
//                     <Button
//                     color="green"
//                     inverted
//                     onClick={this.uploadCroppedImage}
//                     >
//                     <Icon name="save" /> Change Avatar
//                     </Button>
//                 )}
//                 <Button color="green" inverted onClick={this.handleCropImage}>
//                     <Icon name="image" /> Preview
//                 </Button>
//                 <Button color="red" inverted onClick={this.closeModal}>
//                     <Icon name="remove" /> Cancel
//                 </Button>
//                 </Modal.Actions>
//             </Modal>
//         )
//     }
// }

// export default AvatarModal