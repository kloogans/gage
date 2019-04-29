import { observable, decorate } from 'mobx'

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
}

decorate(Instagram, {
  rates: observable,
  login_url: observable,
  user_stats: observable,
  instagram_post_data: observable,
  instagram_user_data: observable
})

const instagram = new Instagram()
export default instagram
