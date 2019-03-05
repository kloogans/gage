import React from 'react'

const InstaMediaCounts = props => (
  <ul className='insta-media-counts'>
    <li className='insta-media-counts__count'>
      <p className='text text--small'>
        <i className='fas fa-heart' />
      </p>
      <p className='text text--medium-small text__weight--x-heavy text__shade--light'>
        {props.averageLikes}
      </p>
    </li>
    <li className='insta-media-counts__count'>
      <p className='text text--small'>
        Total
      </p>
      <p className='text text--medium-small text__weight--x-heavy text__shade--light'>
        {props.totalLikes}
      </p>
    </li>
    <li className='insta-media-counts__count'>
      <p className='text text--small'>
        <i className='fas fa-comment' />
      </p>
      <p className='text text--medium-small text__weight--x-heavy text__shade--light'>
        {props.averageComments}
      </p>
    </li>
    <li className='insta-media-counts__count'>
      <p className='text text--small'>
        Total
      </p>
      <p className='text text--medium-small text__weight--x-heavy text__shade--light'>
        {props.totalComments}
      </p>
    </li>
  </ul>
)

export default InstaMediaCounts
