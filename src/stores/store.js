import { observable, action, decorate } from 'mobx'
import * as mobx from 'mobx'

class Store {
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

  user_global_rate = 0

  client_id = '03de2ea241a2417f867fc912cba0479c'
  redirect_uri = 'https://testing.jamesobrien.io'
  access_token = ''
  login_url = `https://api.instagram.com/oauth/authorize/?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=token`

  hide_tabs = false

  toggle = {
    user: true,
    grid: false,
    menu: false
  }

  checkPreviousAuth() {
    const url = document.location,
          local = window.localStorage.getItem('access_token')
    let hash = url.hash
    if (hash || local) {
      if (hash) {
        hash = hash.substring(hash.indexOf('=') + 1)
        this.access_token = hash
        localStorage.setItem('access_token', hash)
        console.log('AUTH via hash')
        url.hash = ''
      } else if (local) {
        this.access_token = localStorage.getItem('access_token')
        console.log('AUTH via Local')
      } else {
        console.log('Something is wrong')
      }
      this.authenticated = true
      this.initializeStoreData()
    } else {
      console.log('not logged in')
    }
  }

  initializeStoreData() {
    this.getPostData()
    this.getUserData()
    // this.getCurrentToggles()
  }

  async getPostData() {
    const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=${this.access_token}`,
          fetchMedia = window.fetch(url),
          data = await fetchMedia
    try {
      if (data) {
        const insta_data = await data.json()
        this.instagram_post_data = insta_data
        if (insta_data.meta.code === 400) {
          this.authenticated = false
          this.access_token = null
          localStorage.setItem('access_token', '')
        }
      }
    } catch(e) {
      console.error('WRONG', e)
    }
  }

  async getUserData() {
    const url = `https://api.instagram.com/v1/users/self?access_token=${this.access_token}`,
          fetchMedia = window.fetch(url),
          data = await fetchMedia
    try {
      if (data) {
        const insta_data = await data.json()
        this.instagram_user_data = insta_data
        if (insta_data.meta.code === 400) {
          this.authenticated = false
          this.access_token = null
          localStorage.setItem('access_token', '')
        }
      }
    } catch(e) {
      console.error('WRONG', e)
    }
  }

  getUserTotals = () => {
    const data = mobx.toJS(this.instagram_post_data),
          data_posts = data.data,
          user = mobx.toJS(this.instagram_user_data),
          followers = user.data.counts.followed_by

    let likes = 0,
        comments = 0

    data_posts.map(post => {
      likes += post.likes.count
      comments += post.comments.count
      return
    })

    const avg_likes = (likes / data_posts.length).toFixed(0),
          avg_comments = (comments / data_posts.length).toFixed(0),
          total_likes = likes,
          total_comments = comments,
          engagement_avg = ((avg_likes + avg_comments) / followers).toFixed(2)

    this.user_stats = {
      likes_avg: this.formatNum(Number(avg_likes)),
      comments_avg: this.formatNum(Number(avg_comments)),
      likes_total: this.formatNum(total_likes),
      comments_total: this.formatNum(total_comments),
      followers: this.formatNum(followers),
      engagement_avg: Number(engagement_avg)
    }
    this.calculateRating()
  }

  calculateRating = () => {
    let avg = 5.40,
        ig = mobx.toJS(this.user_stats),
        rates = [ig.engagement_avg, 3.45, 0.12],
        count = 0,
        sum = rates.reduce((sum, item) => {
          return count += item
        }, 0),
        rate = sum / rates.length
    console.log()
    this.user_global_rate = (5 * ((rate / avg) * 0.5)).toFixed(2)
    this.user_global_percent = (((rate / avg) * 0.5) * 100).toFixed(2)
  }

  getCurrentToggles = () => {
    const local = localStorage.getItem('gage_toggles')
    if (local) {
      console.log('local: ', mobx.toJS(local))
      this.toggle = local
    } else {
      window.localStorage.setItem('gage_toggles', mobx.toJS(this.toggles))
    }
  }

  toggleInstaGrid = () => {
    this.toggle = {
      user: false,
      grid: true,
      menu: false
    }
  }

  toggleInstaUser = () => {
    this.toggle = {
      user: true,
      grid: false,
      menu: false
    }
  }

  toggleMenu = () => this.toggle.menu = !this.toggle.menu

  handleLogout = () => {
    this.access_token = null
    localStorage.setItem('access_token', '')
    this.authenticated = false
  }

  scrollToTop = () => window.scroll({ top: 0, behavior: 'smooth' })

  formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


decorate(Store, {
  authenticated: observable,
  instagram_post_data: observable,
  instagram_user_data: observable,
  user_stats: observable,
  user_global_rate: observable,
  user_global_percent: observable,
  callback_url: observable,
  hide_tabs: observable,
  toggle: observable,
  getPostData: action,
  checkPreviousAuth: action,
  getCurrentToggles: action,
  toggleInstaGrid: action,
  toggleInstaUser: action,
  toggleMenu: action,
  handleLogout: action,
  getUserTotals: action,
  formatNum: action
})

const store = new Store()
export default store
