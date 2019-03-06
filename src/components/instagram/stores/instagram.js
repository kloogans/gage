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
      ff_ratio: (followers / following).toFixed(2),
      likes_total: total_likes,
      likes_avg: Number(avg_likes),
      total_posts: user.data.counts.media,
      engagement_avg: Number(engagement_avg),
      comments_total: store.formatNum(total_comments),
      comments_avg: store.formatNum(Number(avg_comments))
    }
    return user_stats
  }

  getTotalStats = () => {
    if (this.instagram_post_data && store.authenticated) {
      const data = mobx.toJS(this.instagram_post_data),
            data_posts = data.data,
            user = mobx.toJS(this.instagram_user_data)

      this.user_stats = this.getUserTotals(data_posts, user)
    }
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
  getUserTotals: action,
  initializeStoreData: action
})

const instagram = new Instagram()
export default instagram
