import store from '../stores/store'
import { fetchInstagramData } from './instagramActions'

export const checkInstagramAuth = () => {
    let path = window.location.hash,
        local = localStorage.getItem('access_token')
    path = path.split('=').pop()
    if (local || path.length > 0) {
      if (local) {
        store.access_token = local
        store.authenticated = true
      } else {
        store.access_token = path
        store.authenticated = true
        window.localStorage.setItem('access_token', path)
        store.history.push('/')
      }
      fetchInstagramData()
    } else {
      store.authenticated = false
    }
  }

  export const handleLogin = () => window.location.href = store.login_url

  export const handleLogout = () => {
    localStorage.clear()
    store.authenticated = false
  }
