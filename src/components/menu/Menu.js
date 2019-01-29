import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import instagram from '../instagram/stores/instagram'
import twitter from '../twitter/stores/twitter'

const Menu = observer(
  class Menu extends Component {

    handleLogoutAll = () => {
      twitter.handleLogout()
      instagram.handleLogout()
      store.authenticated = false
      localStorage.clear()
    }

    render() {
      return (
        <div className={store.toggle.menu ? 'menu__wrapper animate__fade-in': 'app--remove'}>
          <div className='menu__inner'>
            <div className='menu__top-bar'>
              <button onClick={store.toggleMenu}>
                <i className='fas fa-times' />
              </button>
            </div>
            <div className='menu__buttons'>
              <Link to='/' onClick={() => store.toggle.menu = false}>
                Home
              </Link>
              <Link to='instagram' onClick={() => store.toggle.menu = false}>
                Instagram
              </Link>
              <Link to='/twitter' onClick={() => store.toggle.menu = false}>
                Twitter
              </Link>
              <button onClick={this.handleLogoutAll}>
                Logout All
              </button>
            </div>
          </div>
        </div>
      )
    }

  }
)

export default Menu
