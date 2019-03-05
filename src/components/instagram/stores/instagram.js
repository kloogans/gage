import { observable, action, decorate } from 'mobx'
import * as mobx from 'mobx'
import store from '../../../stores/store'

class Instagram {
  instagram_post_data = null
  instagram_user_data = null

  user_stats = {
    likes_avg: 0,
    followers: 0,
    likes_total: 0,
    comments_avg: 0,
    comments_total: 0,
    engagement_avg: 0
  }

  rates = {
    global_rate: 0,
    global_percent: 0
  }

  api_url = 'https://api.instagram.com/v1/users/self'
  login_url = `https://api.instagram.com/oauth/authorize/?client_id=a7153eba4b3e4e89959df66a7d3a13b9&redirect_uri=http://localhost:3001/callback&response_type=token`

  checkInstagramAuth = () => {
    let path = window.location.hash,
        local = localStorage.getItem('access_token')
    path = path.split('=').pop()
    if (local || path.length > 0) {
      if (local) {
        store.access_token = local
        store.authenticated = true
      } else {
        store.access_token = path
        store.authenticated = true
        window.localStorage.setItem('access_token', path)
      }
      this.initializeStore()
    } else {
      store.authenticated = false
    }
  }

  initializeStore() {
    this.getUserPostsInsta()
    this.getUserDataInsta()
  }


  getUserPostsInsta = async () => {
    const url = `${this.api_url}/media/recent?access_token=${store.access_token}`
    try {
      const data = await fetch(url),
            data_json = await data.json()
      this.instagram_post_data = await data_json
      if (await data_json) this.getTotalStats()
      if (await data_json.meta.code === 400) store.authenticated = false
    } catch(e) {
      console.error(e)
    }
  }

  getUserDataInsta = async () => {
    const url = `${this.api_url}?access_token=${store.access_token}`
    try {
      const data = await fetch(url)
      const data_json = await data.json()
      this.instagram_user_data = await data_json
      if (await data_json.meta.code === 400) {
        store.authenticated = false
      }
    } catch(e) {
      console.error(e)
    }
  }

  getTotalStats = () => {
    if (this.instagram_post_data && store.authenticated) {
      const data = mobx.toJS(this.instagram_post_data),
            data_posts = data.data,
            user = mobx.toJS(this.instagram_user_data)

      this.user_stats = store.getUserTotals(data_posts, user)
    }
  }

  handleLogin = () => window.location.href = this.login_url

  handleLogout = () => {
    this.access_token = null
    localStorage.removeItem('access_token')
    store.authenticated = false
  }
}

decorate(Instagram, {
  rates: observable,
  login_url: observable,
  user_stats: observable,
  instagram_post_data: observable,
  instagram_user_data: observable,
  handleLogin: action,
  handleLogout: action,
  initializeStoreData: action
})

const instagram = new Instagram()
export default instagram
