import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import { toggleInstaGrid, toggleInstaUser } from '../../actions/toggleActions'

const NavTabs = observer(() => (
  <div className='nav-tabs'>
    <button className={store.toggle.user ? 'nav-tabs__button nav-tabs--active' : 'nav-tabs__button'}
            onClick={toggleInstaUser}>
      Profile
    </button>
    <button className={store.toggle.grid ? 'nav-tabs__button nav-tabs--active-pink' : 'nav-tabs__button'}
            onClick={toggleInstaGrid}>
      Media
    </button>
  </div>
))

export default NavTabs
