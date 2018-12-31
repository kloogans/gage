import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import InstaGrid from './insta-grid/InstaGrid'
import InstaUser from './insta-user/InstaUser'
import Loader from '../loader/Loader'

const Instagram = observer(
  class Instagram extends Component {

    componentDidMount() {
      window.addEventListener("scroll", this._scroll)
    }

    _scroll = () => {
      console.log('is scrolling')
      const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            hideOn = 7,
            headerEl = this.refs.scroll
      if (distanceY > hideOn) {
        store.hide_tabs = true
      } else {
        store.hide_tabs = false
      }
      console.log(store.hide_tabs)
    }

    render() {
      if (store.instagram_post_data && store.instagram_user_data) {
        return (
          <div className='instagram__container animate__fade-in'>
            <div className={store.hide_tabs ? 'instagram__tabs app--hidden' : 'instagram__tabs'}>
              <button className={store.toggle.user ? 'instagram--active' : null}
                      onClick={store.toggleInstaUser}>
                Profile
              </button>
              <button className={store.toggle.grid ? 'instagram--active-pink' : null}
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
