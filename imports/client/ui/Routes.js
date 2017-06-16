import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import IndexPage from './pages/IndexPage'

export default function Routes ({history}) {
  return <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
      </Switch>
    </div>
  </Router>
}

