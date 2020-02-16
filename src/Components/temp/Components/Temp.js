import React from "react";
import firebase from "../../../firebase";
import axios from "axios";
import { Segment, Header, Button } from "semantic-ui-react";

export default class Temp extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      user: firebase.auth().currentUser,
    };
  }

  



 

  render() {
    return (
      <Button inverted onClick={this.checkRepo}>Check repo</Button>
    )
  }
}
