import React from 'react'
import { observer } from 'mobx-react'

const EngagementBox = observer(p => (
  <div className='engagement-box'>
    {
      p.service
        ? (
          <div className='engagement-box__service-icon'>
            <i className={`fab fa-${p.service}`} />
          </div>
        ) : null
    }
    <p>{p.rates}%</p>
  </div>
))

export default EngagementBox
