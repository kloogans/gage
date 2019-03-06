import React from 'react'

const InstaMediaCounts = props => (
  <ul className='insta-media-counts'>
    <li className='insta-media-counts__count'>
      <p className='text text--x-small'>
        Total Likes
      </p>
      <p className='text text--small text__weight--x-heavy text__shade--light'>
        {props.totalLikes}
      </p>
    </li>
    <li className='insta-media-counts__count'>
      <p className='text text--x-small'>
        Total Comments
      </p>
      <p className='text text--small text__weight--x-heavy text__shade--light'>
        {props.totalComments}
      </p>
    </li>
  </ul>
)

export default InstaMediaCounts
