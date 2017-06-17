import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import IndexPage from './pages/IndexPage'
import NotFoundPage from './pages/NotFoundPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

export default function Routes ({history}) {
  return <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/reset-password/:token" component={ResetPasswordPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
}

