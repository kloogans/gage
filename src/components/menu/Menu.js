import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Menu = observer(
  class Menu extends Component {

    render() {
      return (
        <div className={store.toggle.menu ? 'menu__wrapper animate__fade-in': 'app--remove'}>
          <div className='menu__inner'>
            <div className='menu__top-bar'>
              <button onClick={store.toggleMenu}>
                <i className='fas fa-times' />
              </button>
            </div>
            <div className='menu__logout'>
              <button onClick={store.handleLogout}>
                <i className='fas fa-external-link-alt' />
                &nbsp;Logout
              </button>
            </div>
          </div>
        </div>
      )
    }

  }
)

export default Menu
