import React, { Component } from 'react'
import EngagementBox from '../shared/engagement-box/EngagementBox'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import instagram from '../instagram/stores/instagram'
import twitter from '../twitter/stores/twitter'
import store from '../../stores/store'

const Dashboard = observer(
  class Dashboard extends Component {

    render() {
      if (instagram.instagram_user_data || twitter.twitter_user_data) {
        const ig = instagram.instagram_user_data ? mobx.toJS(instagram.instagram_user_data) : null,
              tw = twitter ? mobx.toJS(twitter.twitter_user_data) : null

        return (
          <div className='app__section dashboard animate__fade-in--long'>
            <div className='social__profile-photo'>
              <div className='social__image-wrapper'>
                <img src={!twitter ? ig.data.profile_picture : tw.profile_image} />
              </div>
              <p className='social__username'>
                {!twitter ? ig.data.username : tw.screen_name}
              </p>
            </div>

            <div className='social__stats'>
              <ul className='social__counts'>
                <li>
                  <p>Posts</p>
                  <p>{store.global_rates.global_total_posts}</p>
                </li>
                <li>
                  <p>Followers</p>
                  <p>{store.global_rates.global_total_followers}</p>
                </li>
                <li>
                  <p>Following</p>
                  <p>{store.global_rates.global_total_following}</p>
                </li>
              </ul>

              <EngagementBox rates={store.global_rates} number_type='rating' />

              <ul className='social__counts'>
                <li>
                  <p><i className='fas fa-heart' /></p>
                  <p>{store.global_rates.global_average_likes}</p>
                </li>
                <li>
                  <p>Total</p>
                  <p>{store.global_rates.global_total_likes}</p>
                </li>
                <li>
                  <p><i className='fas fa-users' /></p>
                  <p>{store.global_rates.global_engagement_avg}%</p>
                </li>
              </ul>
            </div>
          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default Dashboard
