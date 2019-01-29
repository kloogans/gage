import React, { Component } from 'react'
import RatingRing from '../../shared/rating-ring/RatingRing'
import EngagementBox from '../../shared/engagement-box/EngagementBox'
import instagram from '../stores/instagram'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import * as mobx from 'mobx'

const InstaUser = observer(
  class InstaUser extends Component {

    render() {
      if (instagram.instagram_user_data) {
        const ig = mobx.toJS(instagram.instagram_user_data),
              data= ig.data,
              stats = instagram.user_stats

        return (
          <div className='app__section animate__fade-in--long'>
            <div className='social__profile-photo'>
              <div className='social__image-wrapper'>
                <img src={data.profile_picture} />
              </div>
              <p className='insta-user__username'>
                {data.username}
              </p>
            </div>

            <div className='social__stats'>
              <ul className='social__counts'>
                <li>
                  <p>Posts</p>
                  <p>{data.counts.media}</p>
                </li>
                <li>
                  <p>Followers</p>
                  <p>{stats.followers}</p>
                </li>
                <li>
                  <p>Following</p>
                  <p>{store.formatNum(data.counts.follows)}</p>
                </li>
              </ul>

              <EngagementBox rates={instagram.user_stats.engagement_avg}
                             number_type='percent'
                             service='instagram'/>

              <ul className='social__counts'>
                <li>
                  <p><i className='fas fa-heart' /></p>
                  <p>{store.formatNum(stats.likes_avg)}</p>
                </li>
                <li>
                  <p>Total</p>
                  <p>{store.formatNum(stats.likes_total)}</p>
                </li>
                <li>
                  <p><i className='fas fa-comment' /></p>
                  <p>{stats.comments_avg}</p>
                </li>
                <li>
                  <p>Total</p>
                  <p>{stats.comments_total}</p>
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

export default InstaUser
