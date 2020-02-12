import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import SidePanel from "./Components/Sidepanel/SidePanel";
import Test from './Components/Views/Test'
import '../../App.css'
const Git = ({ currentUser}) => (
  <Grid columns="equal" className="git-app" style={{ background: "" }}>
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />
    <Grid.Column>
      <Test/>
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Git);
