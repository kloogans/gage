import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import instagram from '../instagram/stores/instagram'

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
            <div className='menu__buttons'>
              <button onClick={() => store.pushNewRoute('home')}>Home</button>
              {
                instagram.authenticated
                  ? (
                    <button onClick={() => store.pushNewRoute('instagram')}>
                      Instagram
                    </button>
                  ) : null
              }
              {
                instagram.authenticated
                  ? (
                    <button onClick={() => store.pushNewRoute('facebook')}>
                      Facebook
                    </button>
                  ) : null
              }
              {
                instagram.authenticated
                  ? (
                    <button onClick={() => store.pushNewRoute('twitter')}>
                      Twitter
                    </button>
                  ) : null
              }

              <button>
                Accounts
              </button>
              <button onClick={instagram.handleLogout}>
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
