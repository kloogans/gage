import { observable, decorate, action } from 'mobx'
import * as mobx from 'mobx'
import store from '../../../stores/store'

 class Twitter {
   authenticated = false
   twitter_loading = true
   twitter_user_data = null
   twitter_posts_data = null
   twitter_averages = null
   twitter_username = null

   twitter_rates = {
     twitter_avg_favorites: 0,
     twitter_avg_retweets: 0,
     twitter_avg_favorites: 0,
     twitter_total_retweets: 0,
     twitter_engagement_rate_all: 0,
     twitter_followed_by: 0
   }

   twitter_toggle = {
     user: true,
     media: false
   }

   // api_url = 'http://192.168.0.7:5000'
   api_url = 'http://localhost:5000'

   checkLocalStorage = () => {
     const local = localStorage.getItem('twitter_username')
     if (local) {
       console.log(local)
       this.twitter_username = local
       this.authenticated = true
       store.authenticated = true
       this.getTwitterUserData(local)
     }
   }

   initializeStore = () => {
     this.getTwitterUserData()
     this.getTwitterPosts()
   }

   getTwitterUserData = async username => {
     this.twitter_username = username
     window.localStorage.setItem('twitter_username', username)
     const url = `${this.api_url}/api/twitter/user?username=${username}`
     try {
       const data = await fetch(url)
       const data_json = await data.json()
       if (await data_json) {
         const twitter = {
           screen_name: await data_json[0].screen_name,
           profile_image: await data_json[0].profile_image_url_https,
           favorites_total: await data_json[0].favourites_count,
           following: await data_json[0].friends_count,
           followed_by: await data_json[0].followers_count,
           posts_count: await data_json[0].statuses_count
         }
         console.log(twitter)
         this.twitter_user_data = twitter
         this.getTwitterPosts(username)
       }
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
       if (await data_json) {
         this.getTwitterTotals()
       }
     } catch(e) {
       console.error(e)
     }
   }

   getTwitterTotals = () => {
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
     const twitter_rates = {
       twitter_avg_favorites: Math.round(favorites / user_posts.length),
       twitter_avg_retweets: Math.round(retweets / user_posts.length),
       total_favorites: favorites,
       twitter_total_retweets: retweets,
       twitter_engagement_rate_all: Number(engagement_rate.toFixed(2)),
       twitter_followed_by: user_data.followed_by,
       twitter_following: user_data.following,
       twitter_total_posts: user_data.posts_count
     }
     console.log(twitter_rates)
     this.twitter_rates = twitter_rates
     this.twitter_loading = false
     store.calculateRatings()
   }

   handleTwitterNavToggles = type => {
     if (type === 'user'){
       this.twitter_toggle = {
         user: true,
         media: false
       }
     }
     if (type === 'media') {
       this.twitter_toggle = {
         user: false,
         media: true
       }
     }
   }

   handleLogout = () => {
     this.twitter_username = null
     this.authenticated = false
     localStorage.removeItem('twitter_username')
   }
 }

 decorate(Twitter, {
   authenticated: observable,
   twitter_loading: observable,
   twitter_user_data: observable,
   twitter_posts_data: observable,
   twitter_averages: observable,
   twitter_rates: observable,
   twitter_username: observable,
   twitter_toggle: observable,
   checkLocalStorage: action,
   getTwitterUserData: action,
   getTwitterPosts: action,
   getTwitterTotals: action,
   handleTwitterNavToggles: action,
   handleLogout: action
 })

 const twitter = new Twitter()
 export default twitter
