import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import twitter from '../twitter/stores/twitter'

const NavTabs = observer(
  class NavTabs extends Component {

    render() {
      const p = { ...this.props }
        if (p.selected_service === 'instagram') {
          return (
            <div className={store.hide_tabs ? 'nav-tabs app--hidden' : 'nav-tabs'}>
              <button className={store.toggle.user ? 'nav-tabs--active' : null}
                      onClick={store.toggleInstaUser}>
                Profile
              </button>
              <button className={store.toggle.grid ? 'nav-tabs--active-pink' : null}
                      onClick={store.toggleInstaGrid}>
                Media
              </button>
            </div>
          )
        } else if (p.selected_service === 'twitter') {
          return (
            <div className={store.hide_tabs ? 'nav-tabs app--hidden' : 'nav-tabs'}>
              <button className={twitter.twitter_toggle.user ? 'nav-tabs--active' : null}
                      onClick={() => twitter.handleTwitterNavToggles('user')}>
                Profile
              </button>
              <button className={twitter.twitter_toggle.media ? 'nav-tabs--active-pink' : null}
                      onClick={() => twitter.handleTwitterNavToggles('media')}>
                Media
              </button>
            </div>
          )
        } else {
          return null
        }
    }

  }
)

export default NavTabs
