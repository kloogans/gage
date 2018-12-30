import React from 'react'
import store from '../../stores/store'
import { observer } from 'mobx-react'

const TopBar = observer(() => (
    <div className='top-bar__wrapper'>
      <h1>gage</h1>
      <button onClick={store.toggleMenu}>
        <i className='fas fa-cog' />
      </button>
    </div>
  )
)

export default TopBar
