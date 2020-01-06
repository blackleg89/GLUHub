import React from "react";
import { Grid } from "semantic-ui-react";
import "../../App.css";
import { connect } from "react-redux";

import SidePanel from "./SidePanel/SidePanel";

const AdminPanel = ({currentUser}) => (
  <Grid columns="equal" className="app" style={{ background: "#1b1c1d" }}>
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(AdminPanel);
