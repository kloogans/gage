import { observable, action, decorate } from 'mobx'
import * as mobx from 'mobx'
import instagram from '../components/instagram/stores/instagram'
import twitter from '../components/twitter/stores/twitter'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class Store {
  authenticated = false

  user_global_rate = 0

  hide_tabs = false

  toggle = {
    user: true,
    grid: false,
    menu: false
  }

  global_rates = {
    global_rate: 0,
    global_percent: 0
  }

  checkAuth() {
    twitter.checkLocalStorage()
    instagram.checkInstagramAuth()
    if (twitter.username) twitter.initializeStore()
  }

  getUserTotals = (posts, user) => {
    const following = user.data.counts.follows,
          followers = user.data.counts.followed_by
    let likes = 0,
        comments = 0

    posts.map(post => {
      likes += post.likes.count
      comments += post.comments.count
      return
    })

    const avg_likes = (likes / posts.length).toFixed(0),
          avg_comments = (comments / posts.length).toFixed(0),
          total_likes = likes,
          total_comments = comments,
          engagement_avg = (((avg_likes + avg_comments) / followers) * 0.1).toFixed(2)

    const user_stats = {
      following: following,
      followers: followers,
      likes_total: total_likes,
      likes_avg: Number(avg_likes),
      total_posts: user.data.counts.media,
      engagement_avg: Number(engagement_avg),
      comments_total: this.formatNum(total_comments),
      comments_avg: this.formatNum(Number(avg_comments))
    }
    return user_stats
  }

  collectUserTotals = () => {
    if (instagram.authenticated) instagram.getTotalStats()
    if (twitter.twitter_username) {
      twitter.getTwitterTotals()
    }
    this.calculateRatings()
  }

  calculateRatings = () => {
    let avg = 5.00,
        ig = instagram ? mobx.toJS(instagram.user_stats) : 0,
        tw = twitter ? mobx.toJS(twitter.twitter_rates) : 0,
        rates = [instagram ? ig.engagement_avg : null, twitter ? tw.twitter_engagement_rate_all : null],
        count = 0,
        sum = rates.reduce((sum, item) => {
          return count += item
        }, 0),
        rate = sum / rates.length,
        likes = [instagram.authenticated ? ig.likes_total : 0, twitter.authenticated ? tw.total_favorites : 0],
        total_likes_count = 0,
        total_likes_global = likes.reduce((sum, item) => {
          return total_likes_count += item
        }, 0),
        average_likes_global = (instagram.authenticated ? ig.likes_avg : 0) + (twitter.authenticated ? tw.twitter_avg_favorites : 0),
        total_posts = (instagram.authenticated ? ig.total_posts : 0) + (twitter.authenticated ? tw.twitter_total_posts : 0),
        total_followers = (instagram.authenticated ? ig.followers : 0) + (twitter.authenticated ? tw.twitter_followed_by : 0),
        total_following = (instagram.authenticated ? ig.following : 0) + (twitter.authenticated ? tw.twitter_following : 0)


    const global_rates = {
      global_engagement_avg: rate.toFixed(2),
      global_rate: (5 * ((rate / avg) * 0.5)).toFixed(3),
      global_percent: (((rate / avg) * 0.5) * 100).toFixed(2),
      global_total_posts: this.formatNum(Number(total_posts)),
      global_total_followers: this.formatNum(total_followers),
      global_total_likes: this.formatNum(Number(total_likes_global)),
      global_total_following: this.formatNum(Number(total_following)),
      global_average_likes: this.formatNum(Number(average_likes_global.toFixed(0)))
    }
    this.global_rates = global_rates
  }

  getCurrentToggles = () => {
    const local = localStorage.getItem('gage_toggles')
    if (local) {
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

  scrollToTop = () => window.scroll({ top: 0, behavior: 'smooth' })

  formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


decorate(Store, {
  authenticated: observable,
  user_stats: observable,
  global_rates: observable,
  user_global_rate: observable,
  user_global_percent: observable,
  callback_url: observable,
  hide_tabs: observable,
  toggle: observable,
  collectUserTotals: observable,
  checkPreviousAuth: action,
  getCurrentToggles: action,
  toggleInstaGrid: action,
  toggleInstaUser: action,
  toggleMenu: action,
  getUserTotals: action,
  formatNum: action
})

const store = new Store()
export default store
