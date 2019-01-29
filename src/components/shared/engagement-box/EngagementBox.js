import React, { Component } from 'react'
import { observer } from 'mobx-react'
import RatingRing from '../rating-ring/RatingRing'

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
    <RatingRing rates={p.rates} number_type={p.number_type} />
  </div>
))

export default EngagementBox
