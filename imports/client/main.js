import { createBrowserHistory } from 'history'

import mountApp from './boot/mount_app'
import importStyles from './boot/import_styles'

const history = createBrowserHistory()

mountApp(history)
importStyles()
