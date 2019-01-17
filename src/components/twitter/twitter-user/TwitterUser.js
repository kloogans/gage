import React, { Component } from 'react'
import EngagementBox from '../../shared/engagement-box/EngagementBox'
import twitter from '../stores/twitter'
import { observer } from 'mobx-react'

const TwitterUser = observer(
  class TwitterUser extends Component {

    render() {
      const p = { ...this.props }
      return (
        <div className='app__section animate__fade-in--long'>
          <div className='social__profile-photo'>
            <div className='social__image-wrapper'>
              <img src={p.data.profile_image} />
              PIC
            </div>
            <p className='insta-user__username'>
              {p.data.screen_name}
            </p>
          </div>

          <div className='social__stats'>
            <ul className='social__counts'>
              <li>
                <p>Posts</p>
                <p>{p.data.posts_count}</p>
              </li>
              <li>
                <p>Followers</p>
                <p>{p.data.followed_by}</p>
              </li>
              <li>
                <p>Following</p>
                <p>{p.data.following}</p>
              </li>
            </ul>

            <EngagementBox rates={Number(twitter.twitter_rates.twitter_engagement_rate_all)} number_type='percent' />

            <ul className='social__counts'>
              <li>
                <p><i className='fas fa-heart' /></p>
                <p>{twitter.twitter_rates.twitter_avg_favorites}</p>
              </li>
              <li>
                <p>Total</p>
                <p>{p.data.favorites_total}</p>
              </li>

              <li>
                <p><i className='fas fa-retweet' /></p>
                <p>{twitter.twitter_rates.twitter_avg_retweets}</p>
              </li>
              <li>
                <p>Total</p>
                <p>{twitter.twitter_rates.twitter_total_retweets}</p>
              </li>
            </ul>
          </div>
        </div>
      )
    }

  }
)

export default TwitterUser
