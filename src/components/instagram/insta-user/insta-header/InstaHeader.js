import React from 'react'

const InstaHeader = props => (
  <header className='insta-header'>
    <div className='insta-header__image-wrapper'>
      <img src={props.img} alt={props.name + ' profile photo'} />
    </div>
    <p className='insta-header__username'>
      {props.username}
    </p>
  </header>
)

export default InstaHeader
