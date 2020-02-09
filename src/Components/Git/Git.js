import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import SidePanel from "./Sidepanel/SidePanel";

const Git = ({ currentUser, currentChannel, }) => (
  <Grid columns="equal" className="git-app" style={{ background: "#1b1c1d" }}>
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Git);
