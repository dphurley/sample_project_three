import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Companies from './Companies'
import Company from './Company'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Companies}/>
          <Route path="/companies/:companyId" component={Company} />
        </Switch>
      </Router>
    )
  }
}

export default App
