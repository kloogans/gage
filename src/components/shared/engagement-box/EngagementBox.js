import React, { Component } from 'react'
import { observer } from 'mobx-react'
import RatingRing from '../rating-ring/RatingRing'

const EngagementBox = observer(props => (
  <div className='engagement-box'>
    <RatingRing rates={props.rates} number_type={props.number_type} />
  </div>
))

export default EngagementBox
