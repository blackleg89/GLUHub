import React from 'react'
import {Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'

const App = ({currentUser}) => (
  <Grid columns="equal" className="app" style={{background: "#1b1c1d"}}>
    <p>Hallo</p>
  </Grid>
)

const mapStateToProps = state => ({
  currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(App)