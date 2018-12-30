import { observable, action, decorate } from 'mobx'

class Store {
  authenticated = false

  instagram_post_data = null
  instagram_user_data = null

  client_id = '03de2ea241a2417f867fc912cba0479c'
  access_token = '2140277165.03de2ea.de20310187d1444d8403188077f8a6d7'
  login_url = `https://api.instagram.com/oauth/authorize/?client_id=${this.client_id}&redirect_uri=http://localhost:3001&response_type=token`

  toggle = {
    user: true,
    grid: false,
    menu: false
  }

  async getPostData() {
    const url = `https://api.instagram.com/v1/users/self/media/recent?access_token=${this.access_token}`
    const fetchMedia = window.fetch(url)
    const data = await fetchMedia
    try {
      if (data) {
        const insta_data = await data.json()
        this.instagram_post_data = insta_data
        console.log('post data: ', insta_data)
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
    const url = `https://api.instagram.com/v1/users/self?access_token=${this.access_token}`
    const fetchMedia = window.fetch(url)
    const data = await fetchMedia
    try {
      if (data) {
        const insta_data = await data.json()
        this.instagram_user_data = insta_data
        console.log('user data: ',insta_data)

      }
    } catch(e) {
      console.error('WRONG', e)
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
}


decorate(Store, {
  authenticated: observable,
  instagram_post_data: observable,
  instagram_user_data: observable,
  callback_url: observable,
  toggle: observable,
  getPostData: action,
  toggleInstaGrid: action,
  toggleInstaUser: action,
  toggleMenu: action,
  handleLogout: action
})

const store = new Store()
export default store
