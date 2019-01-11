import { observable, action, decorate } from 'mobx'
import * as mobx from 'mobx'
import instagram from '../components/instagram/stores/instagram'
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

  pushNewRoute = service => {
    history.push(`/${service}`)
    this.toggle.menu = false
  }

  checkPreviousAuth() {
    this.checkAuth()
  }

  checkAuth = () => instagram.checkInstagramAuth()

  getUserTotals = (posts, user) => {
    const followers = user.data.counts.followed_by
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
          engagement_avg = ((avg_likes + avg_comments) / followers).toFixed(2)

    const user_stats = {
      likes_avg: this.formatNum(Number(avg_likes)),
      comments_avg: this.formatNum(Number(avg_comments)),
      likes_total: this.formatNum(total_likes),
      comments_total: this.formatNum(total_comments),
      followers: this.formatNum(followers),
      engagement_avg: Number(engagement_avg)
    }
    return user_stats
  }

  collectUserTotals = () => {
    if (instagram.authenticated) instagram.getTotalStats()
    this.calculateRatings()
  }

  calculateRatings = () => {
    let avg = 5.40,
        ig = mobx.toJS(instagram.user_stats),
        rates = [ig.engagement_avg, 3.45, 0.12],
        count = 0,
        sum = rates.reduce((sum, item) => {
          return count += item
        }, 0),
        rate = sum / rates.length
    const global_rates = {
      global_rate: (5 * ((rate / avg) * 0.5)).toFixed(3),
      global_percent: (((rate / avg) * 0.5) * 100).toFixed(2)
    }
    this.global_rates = global_rates
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
