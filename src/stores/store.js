import { observable, action, decorate } from 'mobx'
import instagram from '../components/instagram/stores/instagram'
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

  local = 'http://localhost:3001/callback'
  prod = 'https://gage.jamesobrien.io/callback'

  api_url = 'https://api.instagram.com/v1/users/self'
  login_url = `https://api.instagram.com/oauth/authorize/?client_id=a7153eba4b3e4e89959df66a7d3a13b9&redirect_uri=${this.local}&response_type=token`

  initializeStore() {
    this.getUserPostsInsta()
    this.getUserDataInsta()
  }

  checkInstagramAuth = () => {
    let path = window.location.hash,
        local = localStorage.getItem('access_token')
    path = path.split('=').pop()
    if (local || path.length > 0) {
      if (local) {
        this.access_token = local
        this.authenticated = true
      } else {
        this.access_token = path
        this.authenticated = true
        window.localStorage.setItem('access_token', path)
        this.history.push('/')
      }
      this.initializeStore()
    } else {
      this.authenticated = false
    }
  }

  getUserPostsInsta = async () => {
    const url = `${this.api_url}/media/recent?access_token=${this.access_token}`
    try {
      const data = await fetch(url),
            data_json = await data.json()
      instagram.instagram_post_data = await data_json
      if (await data_json) instagram.getTotalStats()
      if (await data_json.meta.code === 400) this.authenticated = false
    } catch(e) {
      console.error(e)
    }
  }

  getUserDataInsta = async () => {
    const url = `${this.api_url}?access_token=${this.access_token}`
    try {
      const data = await fetch(url)
      const data_json = await data.json()
      instagram.instagram_user_data = await data_json
      if (await data_json.meta.code === 400) {
        this.authenticated = false
      }
    } catch(e) {
      console.error(e)
    }
  }

  handleLogin = () => window.location.href = this.login_url

  handleLogout = () => {
    localStorage.clear()
    this.authenticated = false
  }

  toggleInstaGrid = () => {
    this.animate = {
      left: true,
      right: false
    }
    this.toggle = {
      user: false,
      grid: true,
      menu: false
    }
  }

  toggleInstaUser = () => {
    this.animate = {
      left: false,
      right: true
    }
    this.toggle = {
      user: true,
      grid: false,
      menu: false
    }
  }

  toggleMenu = () => this.toggle.menu = !this.toggle.menu

  scrollToTop = () => window.scroll({ top: 0, behavior: 'smooth' })

  formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


decorate(Store, {
  authenticated: observable,
  user_stats: observable,
  hide_tabs: observable,
  toggle: observable,
  animate: observable,
  handleLogin: action,
  handleLogout: action,
  toggleInstaGrid: action,
  toggleInstaUser: action,
  toggleMenu: action,
  getUserTotals: action,
  formatNum: action
})

const store = new Store()
export default store
