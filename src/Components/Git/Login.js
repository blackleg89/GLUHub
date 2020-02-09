// import React from 'react'
// import {Button, Icon, Grid, Header} from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
// import firebase from '../../firebase'
// class GitLogin extends React.Component{
//     state ={
//         token: '',
//         gitUser: '',
//         user: this.props.currentUser,
//         usersRef: firebase.database().ref('users'),
//         gitRef:firebase.database().ref("git"),
//         userRef: firebase.auth().currentUser,
//         auth: firebase.auth(),
//         provider:new firebase.auth.GithubAuthProvider()
//     }

//     loginPopup = ()=>{
//         this.state.auth.signInWithPopup(this.state.provider).then((result)=>{
//             this.setState({token:result.credential.accessToken, gitUser:result.user})
//             console.log(this.state.token)
//         })
//     }

//     render(){
//         return(
//             <Button onClick={this.loginPopup}>Login with github</Button>
//         )
//     }
// }

// export default GitLogin;