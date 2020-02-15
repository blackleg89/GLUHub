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
      responses: []
    };
  }

  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    axios
      .get(`https://api.github.com/users/${this.state.user.displayName}/repos`)
      .then(response => {
        this.setState({
          responses: response.data
        });
        if (this.state.responses.length) {
          console.log(this.state.responses.length);
        }

        response.map(r => (
            <div>
                {r}
            </div>
        ))
      });
  };

 

  render() {
    return <div>{this.displayRepos}</div>;
  }
}
