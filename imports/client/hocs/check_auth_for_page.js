import { compose, branch, renderComponent } from 'recompose'

import withCurrentUser from './with_current_user'
import PageCenterLoading from '../ui/components/PageCenterLoading'
import NotLoggedInRedirect from '../ui/views/NotLoggedInRedirect'

export default compose(
  withCurrentUser('_currentUser'),
  branch(({_currentUser}) => _currentUser.loggingIn, renderComponent(PageCenterLoading)),
  branch(({_currentUser}) => !_currentUser.user, renderComponent(NotLoggedInRedirect))
)