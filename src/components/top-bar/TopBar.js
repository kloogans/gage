import React from 'react'
import store from '../../stores/store'
import { observer } from 'mobx-react'

const TopBar = observer(() => (
    <div className='top-bar__wrapper'>
      <div className='top-bar__inner'>
        <h1>gage</h1>
        <button onClick={store.toggleMenu}>
          <i className='fas fa-cog' />
        </button>
      </div>
    </div>
  )
)

export default TopBar
