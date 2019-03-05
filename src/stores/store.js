import { observable, action, decorate } from 'mobx'
import instagram from '../components/instagram/stores/instagram'

class Store {
  authenticated = false

  hide_tabs = false

  toggle = {
    user: true,
    grid: false,
    menu: false
  }

  checkAuth() {
    instagram.checkInstagramAuth()
  }

  getUserTotals = (posts, user) => {
    const following = user.data.counts.follows,
          followers = user.data.counts.followed_by
    let likes = 0,
        comments = 0

    posts.map(post => {
      likes += post.likes.count
      comments += post.comments.count
      return null
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
  hide_tabs: observable,
  toggle: observable,
  toggleInstaGrid: action,
  toggleInstaUser: action,
  toggleMenu: action,
  getUserTotals: action,
  formatNum: action
})

const store = new Store()
export default store
