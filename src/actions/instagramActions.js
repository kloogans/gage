import store from '../stores/store'
import instagram from '../components/instagram/stores/instagram'
import { getTotalStats } from '../components/instagram/actions/igActions'

export const getUserDataInsta = async () => {
  const url = `${store.api_url}?access_token=${store.access_token}`
  const data = await fetch(url)
  try {
    const data_json = await data.json()
    instagram.instagram_user_data = await data_json
    if (await data_json.meta.code === 400) {
      store.authenticated = false
    }
  } catch(e) {
    console.error(e)
  }
}

export const getUserPostsInsta = async () => {
  const url = `${store.api_url}/media/recent?access_token=${store.access_token}`
  try {
    const data = await fetch(url),
          data_json = await data.json()
    instagram.instagram_post_data = await data_json
    if (await data_json) getTotalStats()
    if (await data_json.meta.code === 400) store.authenticated = false
  } catch(e) {
    console.error(e)
  }
}

export const fetchInstagramData = () => {
  getUserPostsInsta()
  getUserDataInsta()
}
