import { observable, decorate, action } from 'mobx'
 class Twitter {
   twitter_data = null

   twitter_username = null

   api_url = 'http://localhost:5000'

   getTwitterUserData = async username => {
     this.twitter_username = username
     console.log(username)
     const url = `${this.api_url}/api/twitter/user?username=${username}`
     const data = await fetch(url)
     const data_json = await data.json()
     try {
       console.log(data_json)
     } catch(e) {
       console.error(e)
     }
   }
 }

 decorate(Twitter, {
   twitter_data: observable,
   twitter_username: observable,
   getTwitterUserData: action
 })

 const twitter = new Twitter()
 export default twitter
