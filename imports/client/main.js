import { createBrowserHistory } from 'history'

import mountApp from './boot/mount_app'

const history = createBrowserHistory()

mountApp(history)
