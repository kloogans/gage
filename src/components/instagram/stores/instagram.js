import { observable, action, decorate } from 'mobx'
import * as mobx from 'mobx'
import store from '../../../stores/store'

class Instagram {
  authenticated = false
  instagram_post_data = null
  instagram_user_data = null

  user_stats = {
    likes_avg: 0,
    comments_avg: 0,
    likes_total: 0,
    comments_total: 0,
    followers: 0,
    engagement_avg: 0
  }

  rates = {
    global_rate: 0,
    global_percent: 0
  }

  api_url = 'http://gage.to:5000'
  login_url = `${this.api_url}/auth/instagram`

  checkInstagramAuth = async () => {
    const url =`${this.api_url}/api/check-auth`,
          local = localStorage.getItem('access_token')
    try {
      const data = await fetch(url)
      const data_json = await data.json()
      console.log(data_json)
      if (data_json.authenticated_ig || local) {
        if (local) {
          this.authenticated = true
          store.authenticated = true
          this.access_token = local
        } else {
          this.authenticated = true
          store.authenticated = true
          this.access_token = data_json.access_token
          window.localStorage.setItem('access_token', data_json.access_token)
        }
        instagram.initializeStore()
        console.log('checked auth, we\'re good',)
      }
    } catch(e) {
      console.error(e)
    }
  }

  initializeStore() {
    this.getUserPostsInsta()
    this.getUserDataInsta()
  }


  getUserPostsInsta = async () => {
    const url = `${this.api_url}/api/instagram/self/posts`
    try {
      const data = await fetch(url),
            data_json = await data.json()
      console.log('post data: ', data_json)
      this.instagram_post_data = await data_json
      if (await data_json) this.getTotalStats()
      if (await data_json.meta.code === 400) this.handleLogout()
    } catch(e) {
      console.error(e)
    }
  }

  getUserDataInsta = async () => {
    const url = `${this.api_url}/api/instagram/self`
    try {
      const data = await fetch(url)
      const data_json = await data.json()
      this.instagram_user_data = await data_json
      if (await data_json.meta.code === 400) {
        this.handleLogout()
      }
    } catch(e) {
      console.error(e)
    }
  }

  getTotalStats = () => {
    console.log('running total stats')
    if (this.instagram_post_data) {
      const data = mobx.toJS(this.instagram_post_data),
            data_posts = data.data,
            user = mobx.toJS(this.instagram_user_data)

      this.user_stats = store.getUserTotals(data_posts, user)
      store.calculateRatings()
    }
  }

  handleLogin = () => window.location.href = this.login_url

  handleLogout = () => {
    this.access_token = null
    localStorage.setItem('access_token', '')
    this.authenticated = false
    window.location.href = (`${this.api_url}/auth/instagram/logout`)
  }
}

decorate(Instagram, {
  authenticated: observable,
  instagram_post_data: observable,
  instagram_user_data: observable,
  user_stats: observable,
  rates: observable,
  initializeStoreData: action,
  handleLogin: action,
  handleLogout: action
})

const instagram = new Instagram()
export default instagram
