import React from 'react'
import store from '../../stores/store'
import { observer } from 'mobx-react'

const TopBar = observer(() => (
    <nav className='top-bar'>
      <div className='top-bar__inner'>
        <h1 className='top-bar__logo'
            onClick={store.scrollToTop}>
          gage
        </h1>
        <button className='top-bar__button' onClick={store.toggleMenu}>
          <i className='fas fa-cog' />
        </button>
      </div>
    </nav>
  )
)

export default TopBar
