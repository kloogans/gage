import { observable, action, decorate } from 'mobx'
import * as mox from 'mobx'
import store from '../../../stores/store'

class Facebook {
  fuck = 'fuck'
  authenticated = false

  checkFacebookAuth = async () => {
    const url =`${this.api_url}/api/check-auth`,
          local = localStorage.getItem('access_token')
    try {
      const data = await fetch(url)
      const data_json = await data.json()
      }
    } catch(e) {
      console.error(e)
    }
  }
}

decorate(Facebook, {
  fuck: observable,
  authenticated: observable,
  checkFacebookAuth: action
})

const facebook = new Facebook()
export default facebook
