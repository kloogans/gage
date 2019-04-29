import React from 'react'
import { observer } from 'mobx-react'
import { toggleMenu } from '../../actions/toggleActions'
import { scrollToTop } from '../../actions/utilityActions'

const TopBar = observer(() => (
    <nav className='top-bar'>
      <div className='top-bar__inner'>
        <button className='top-bar__button'>
          <i className='fas fa-cog' />
        </button>
        <h1 className='top-bar__logo'
            onClick={scrollToTop}>
          gage
        </h1>
        <button className='top-bar__button' onClick={toggleMenu}>
          <i className='fas fa-cog' />
        </button>
      </div>
    </nav>
  )
)

export default TopBar
