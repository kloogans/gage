import React from 'react'

const InstaUserCounts = props => (
  <ul className='insta-user-counts'>
    <li className='insta-user-counts__count'>
      <p className='text text--small'>
        Posts
      </p>
      <p className='text text--medium-small text__weight--x-heavy text__shade--light'>
        {props.posts}
      </p>
    </li>
    <li className='insta-user-counts__count'>
      <p className='text text--small'>
        Followers
      </p>
      <p className='text text--medium-small text__weight--x-heavy text__shade--light'>
        {props.followers}
      </p>
    </li>
    <li className='insta-user-counts__count'>
      <p className='text text--small'>
        Following
      </p>
      <p className='text text--medium-small text__weight--x-heavy text__shade--light'>
        {props.following}
      </p>
    </li>
  </ul>
)

export default InstaUserCounts
