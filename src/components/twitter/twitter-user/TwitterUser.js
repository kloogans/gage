import React, { Component } from 'react'
import EngagementBox from '../../shared/engagement-box/EngagementBox'
import twitter from '../stores/twitter'
import { observer } from 'mobx-react'

const TwitterUser = observer(
  class TwitterUser extends Component {

    render() {
      return (
        <div className='app__section animate__fade-in--long'>
          <div className='social__profile-photo'>
            <div className='social__image-wrapper'>
              {/* <img src={data.profile_picture} /> */}
              PIC
            </div>
            <p className='insta-user__username'>
              username
            </p>
          </div>

          <div className='social__stats'>
            <ul className='social__counts'>
              <li>
                <p>Posts</p>
                <p>97</p>
              </li>
              <li>
                <p>Followers</p>
                <p>378</p>
              </li>
              <li>
                <p>Following</p>
                <p>155</p>
              </li>
            </ul>

            <EngagementBox rates={9.88} number_type='percent' />

            <ul className='social__counts'>
              <li>
                <p><i className='fas fa-heart' /></p>
                <p>3</p>
              </li>
              <li>
                <p>Total</p>
                <p>313</p>
              </li>
              <li>
                <p><i className='fas fa-comment' /></p>
                <p>1</p>
              </li>
              <li>
                <p>Total</p>
                <p>41</p>
              </li>
            </ul>
          </div>
        </div>
      )
    }

  }
)

export default TwitterUser
