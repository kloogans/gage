import { observable, decorate, action } from 'mobx'
import * as mobx from 'mobx'

 class Twitter {
   twitter_loading = true
   twitter_user_data = null
   twitter_posts_data = null
   twitter_averages = null
   twitter_username = null

   api_url = 'http://192.168.0.7:5000'
   // api_url = 'http://localhost:5000'

   checkLocalStorage = () => {
     const local = localStorage.getItem('twitter_username')
     if (local) {
       this.twitter_username = local
       this.getTwitterUserData(local)
     }
   }

   getTwitterUserData = async username => {
     this.twitter_username = username
     window.localStorage.setItem('twitter_username', username)
     const url = `${this.api_url}/api/twitter/user?username=${username}`
     try {
       const data = await fetch(url)
       const data_json = await data.json()
       const twitter = {
         screen_name: await data_json[0].screen_name,
         profile_image: await data_json[0].profile_image_url_https,
         favorites_total: await data_json[0].favourites_count,
         following: await data_json[0].friends_count,
         followed_by: await data_json[0].followers_count,
         posts_count: await data_json[0].statuses_count
       }
       this.twitter_user_data = twitter
       this.getTwitterPosts(username)
     } catch(e) {
       console.error(e)
     }
   }

   getTwitterPosts = async username => {
     const url = `${this.api_url}/api/twitter/user/posts`
     try {
       const data = await fetch(url)
       const data_json = await data.json()
       this.twitter_posts_data = await data_json
       console.log(data_json)
       if (await data_json) {
         this.calculateTwitterRates()
       }
     } catch(e) {
       console.error(e)
     }
   }

   calculateTwitterRates = () => {
     const user_data = mobx.toJS(this.twitter_user_data),
           user_posts = mobx.toJS(this.twitter_posts_data),
           favorites_total = user_data.favorites_total,
           followers_total = user_data.followed_by

     let favorites = 0
     let retweets = 0
     user_posts.map(p => {
       favorites += Number(p.favorite_count)
       retweets += Number(p.retweet_count)
     })

     const engagement_rate = ((favorites_total + retweets) / followers_total)
     console.log('twitter rate: ', engagement_rate)
     const post_rates = {
       twitter_avg_favorites: Math.round(favorites / user_posts.length),
       twitter_avg_retweets: Math.round(retweets / user_posts.length),
       twitter_total_retweets: retweets,
       twitter_engagement_rate_all: engagement_rate.toFixed(2)
     }
     this.twitter_rates = post_rates
     this.twitter_loading = false
   }
 }

 decorate(Twitter, {
   twitter_loading: observable,
   twitter_user_data: observable,
   twitter_posts_data: observable,
   twitter_averages: observable,
   twitter_username: observable,
   checkLocalStorage: action,
   getTwitterUserData: action,
   getTwitterPosts: action
 })

 const twitter = new Twitter()
 export default twitter
