import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const NavTabs = observer(() => (
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
))

export default NavTabs
