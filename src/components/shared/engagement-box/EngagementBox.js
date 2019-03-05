import React from 'react'
import { observer } from 'mobx-react'

const EngagementBox = observer(props => (
  <div className='engagement-box'>
    <div className='engagement-box__social-icon'>
      <i className='fab fa-instagram' />
    </div>
    <p className='engagement-box__rate'>{props.rates}%</p>
  </div>
))

export default EngagementBox
