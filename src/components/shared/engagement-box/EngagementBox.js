import React from 'react'
import { observer } from 'mobx-react'

const EngagementBox = observer(props => (
  <div className='engagement-box'>
    <ul className='engagement-box__grid'>
      <li className='engagement-box__grid-item'>
        <p className='text text--x-small text--white'>
          Engagement Rate
        </p>
        <p className='engagement-box__rate'>{props.rates}%</p>
      </li>
      <li className='engagement-box__grid-item'>
        <p className='text text--x-small text--white'>
          F/F Ratio
        </p>
        <p className='engagement-box__rate'>{props.ratio}</p>
      </li>
      <li className='engagement-box__grid-item'>
        <p className='text text--x-small text--white'>
          Average Likes
        </p>
        <p className='engagement-box__rate'>{props.averageLikes}</p>
      </li>
      <li className='engagement-box__grid-item'>
        <p className='text text--x-small text--white'>
          Average Comments
        </p>
        <p className='engagement-box__rate'>{props.averageComments}</p>
      </li>
    </ul>
  </div>
))

export default EngagementBox
