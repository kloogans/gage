import instagram from '../stores/instagram'
import { formatNum } from '../../../actions/utilityActions'
import store from '../../../stores/store'

const getUserTotals = (posts, user) => {
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
    comments_total: formatNum(total_comments),
    comments_avg: formatNum(Number(avg_comments))
  }
  return user_stats
}

export const getTotalStats = () => {
  if (instagram.instagram_post_data && store.authenticated) {
    const data = instagram.instagram_post_data,
    data_posts = data.data,
    user = instagram.instagram_user_data

    instagram.user_stats = getUserTotals(data_posts, user)
  }
}
