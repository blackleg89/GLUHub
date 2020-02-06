import React from 'react'
import firebase from '../../firebase'
import {
    Grid,
    Form,
    Button,
    Header,
    Message,
    Icon,
    Segment,
    Modal
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends React.Component{
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false,
        auth: firebase.auth(),
        modal:false,
        provider: new firebase.auth.GithubAuthProvider()
    }

    displayErrors=  errors =>   
        errors.map((error, i) => <p key={i}>{error.message}</p>)

    handleChange = event =>{
        this.setState({ [event.target.name]: event.target.value})
    }

    openModal = () => this.setState({modal:true})
    closeModal = () => this.setState({modal:false})

    resetPassword = event =>{
        event.preventDefault();
        this.state.auth.sendPasswordResetEmail(this.state.email).then(function(){
            console.log('Email send')
        }).catch(function(error){
            console.error(error)
        })
    }

    //login with github
    loginGithub = () =>{
        firebase.auth().signInWithPopup(this.state.provider).then(function(result){
            let token = result.credential.accessToken
            let user = result.user
        }).catch(function(error){
            console.error(error)
        })
    }


    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid(this.state)){
            this.setState({errors: [], loading:true})
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser)
                })
                .catch(err => {
                    console.error(err)
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading:false
                    })
                })
        }
    }
    isFormValid = ({email, password})=> email && password

    handleInputError = (errors, inputName) =>{
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : ""
    }

    render(){
        const {email, errors,  password,loading, modal} = this.state
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="blue" textAlign="center">
                    <Icon name="ticket" color="blue"/>
                    Login to Glu-Hub
                </Header>
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment stacked>
                    <Form.Input
                        fluid
                        name="email"
                        icon="mail"
                        iconPosition="left"
                        placeholder="Email Address"
                        onChange={this.handleChange}
                        value={email}
                        className={this.handleInputError(errors, "email")}
                        type="email"
                    />

                    <Form.Input
                        fluid
                        name="password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={password}
                        className={this.handleInputError(errors, "password")}
                        type="password"
                    />

                    <Button
                        disabled={loading}
                        className={loading ? "loading" : ""}
                        color="blue"
                        fluid
                        size="large"
                    >
                        Submit
                    </Button>
                </Segment>
          </Form>
          <Modal size="mini" open={modal} onClose={this.closeModal}>
              <Modal.Header>
                  Wachtwoord vergeten
              </Modal.Header>
              <Modal.Content>
                  <Form onSubmit={this.resetPassword} size="mini">
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            placeholder="email"
                            onChange={this.handleChange}
                            value={email}
                            className={this.handleInputError(errors, "email")}
                            type="email"
                        />
                        <Button
                            color="grey"
                            fluid
                            size="large"
                        >
                            Submit
                        </Button>
                  </Form>
              </Modal.Content>
              
          </Modal>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an account? <Link to="/umu">Register</Link><br/>
          </Message>
            <Button onClick={this.openModal}>Wachtwoord vergeten?</Button>
            <Button onClick={this.loginGithub}>Login met github</Button>
        </Grid.Column>
      </Grid>
        )
    }

}

export default Login