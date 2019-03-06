import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Menu = observer(() => {
  const handleLogoutAll = () => store.handleLogout()
  return (
    <div className={store.toggle.menu ? 'menu__wrapper animate__fade-in': 'app--remove'}>
      <div className='menu__inner'>
        <div className='menu__top-bar'>
          <button className='menu__button--close' onClick={store.toggleMenu}>
            <i className='fas fa-times' />
          </button>
        </div>
        <button className='menu__button' onClick={handleLogoutAll}>
          Logout
        </button>
      </div>
    </div>
  )
})

export default Menu
