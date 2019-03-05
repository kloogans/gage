import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const NavTabs = observer(() => (
  <div className='nav-tabs'>
    <button className={store.toggle.user ? 'nav-tabs__button nav-tabs--active' : 'nav-tabs__button'}
            onClick={store.toggleInstaUser}>
      Profile
    </button>
    <button className={store.toggle.grid ? 'nav-tabs__button nav-tabs--active-pink' : 'nav-tabs__button'}
            onClick={store.toggleInstaGrid}>
      Media
    </button>
  </div>
))

export default NavTabs
