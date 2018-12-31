import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import InstaGrid from './insta-grid/InstaGrid'
import InstaUser from './insta-user/InstaUser'
import Loader from '../loader/Loader'

const Instagram = observer(
  class Instagram extends Component {

    render() {
      if (store.instagram_post_data && store.instagram_user_data && false) {
        return (
          <div className='instagram__container animate__fade-in'>
            <div className='instagram__tabs'>
              <button className={store.toggle.user ? 'instagram--active' : null}
                      onClick={store.toggleInstaUser}>
                Profile
              </button>
              <button className={store.toggle.grid ? 'instagram--active' : null}
                      onClick={store.toggleInstaGrid}>
                Media
              </button>
            </div>
            <div className='instagram__content-wrapper'>
              {
                store.toggle.user
                  ? <InstaUser />
                  : <InstaGrid />
              }
            </div>
          </div>
        )
      } else {
        return <Loader />
      }
    }

  }
)

export default Instagram
