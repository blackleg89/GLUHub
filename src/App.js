import React, {Component} from 'react'
import firebase from './firebase'
import {Button} from 'semantic-ui-react'

class App extends Component {
  state ={
    user: this.props.currentUser,
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.database().ref("users")
  }

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out"))
  }

  render(){ 
    return(
      <div className="App">
        <Button onClick={this.handleSignout}>Sign out</Button>
      </div>
    )
  }
}

export default App 
