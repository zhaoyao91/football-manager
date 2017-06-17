import './boot/import_styles'

import { createBrowserHistory } from 'history'

import mountApp from './boot/mount_app'
import configAccountsLinks from './boot/config_accounts_links'

const history = createBrowserHistory()

configAccountsLinks(history)
mountApp(history)