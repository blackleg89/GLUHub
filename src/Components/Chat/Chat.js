// import React from "react";
// import { Grid } from "semantic-ui-react";
// import "../../App.css";
// import { connect } from "react-redux";
// import Messages from "./Messages";
// // prettier-ignore
// const Chat = ({ currentUser, currentChannel, isPrivateChannel,primaryColor, secondaryColor  }) => (
//   <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
//     <Grid.Column width = {6} style={{ marginLeft: 320 }}>
//       <Messages
//         key={currentChannel && currentChannel.id}
//         currentChannel={currentChannel}
//         currentUser={currentUser}
//         isPrivateChannel={isPrivateChannel}
//       />
//     </Grid.Column>
//   </Grid>
// );

// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser,
//   currentChannel: state.channel.currentChannel,
//   isPrivateChannel: state.channel.isPrivateChannel,
//   userPosts: state.channel.userPosts,
//   primaryColor: state.colors.primaryColor,
//   secondaryColor: state.colors.secondaryColor
// });

// export default connect(mapStateToProps)(Chat);
