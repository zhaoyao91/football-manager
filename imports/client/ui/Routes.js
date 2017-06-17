import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import IndexPage from './pages/IndexPage'
import NotFoundPage from './pages/NotFoundPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import MyProfilePage from './pages/MyProfilePage'

export default function Routes ({history}) {
  return <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/reset-password/:token" component={ResetPasswordPage}/>
        <Route exact path="/me" component={() => <Redirect to="/me/profile"/>}/>
        <Route exact path="/me/profile" component={MyProfilePage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
}

