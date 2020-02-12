import React from "react";
import { Menu, Button } from "semantic-ui-react";
import UserPanel from "./Userpanel";
import axios from 'axios'
import firebase from '../../../../firebase'
class SidePanel extends React.Component {
  state = {
    user: firebase.auth().currentUser
  }

  componentDidMount(){
    this.checkMyRepos();
  }

  checkMyRepos = () =>{
    const check = axios.get(`https://api.github.com/users/${this.state.user.displayName}`)
      .then(response =>{
        this.setState({
          repos: response.data.items
        })
        console.log(response)
      })
      console.log(check)
  }

  render() {

    const { currentUser} = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{fontSize: "1.2rem"}}
      >
        <Button onClick={this.checkMyRepos}/>
        <UserPanel currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
