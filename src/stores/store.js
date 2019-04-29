import { observable, decorate } from 'mobx'
import createBrowserHistory from 'history/createBrowserHistory'

class Store {
  authenticated = false
  history = createBrowserHistory()

  hide_tabs = false
  animate = {
    left: false,
    right: true
  }

  toggle = {
    user: true,
    grid: false,
    menu: false
  }

  local = 'http://localhost:3000/callback'
  prod = 'https://gage.jamesobrien.io/callback'

  api_url = 'https://api.instagram.com/v1/users/self'
  login_url = `https://api.instagram.com/oauth/authorize/?client_id=a7153eba4b3e4e89959df66a7d3a13b9&redirect_uri=${this.local}&response_type=token`
}


decorate(Store, {
  authenticated: observable,
  user_stats: observable,
  hide_tabs: observable,
  toggle: observable,
  animate: observable
})

const store = new Store()
export default store
