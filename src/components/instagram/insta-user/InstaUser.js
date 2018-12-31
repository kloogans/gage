import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import * as mobx from 'mobx'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

// const InstaUser = observer(() => (
//   // if (store.instagram_user_data) {
//     // const data = store.instagram_user_data
//       <div className='insta-user__container'>
//         <div className='insta-user__image-wrapper'>
//           {/* <img src={} /> */}
//         </div>
//       </div>
//   // } else {
//     // return 'Loading...'
//   // }
// ))

const InstaUser = observer(
  class InstaUser extends Component {

    componentDidMount() {
      if (store.instagram_post_data) store.getUserTotals()
    }

    render() {
      if (store.instagram_user_data) {
        const ig = mobx.toJS(store.instagram_user_data),
              data= ig.data,
              stats = store.user_stats
        return (
          <div className='app__section'>
            <div className='insta-user__profile-photo'>
              <div className='insta-user__image-wrapper'>
                <img src={data.profile_picture} />
              </div>
              <p className='insta-user__username'>
                {data.username}
              </p>
            </div>

            <div className='insta-user__stats'>

              <ul className='insta-user__counts'>
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
              <div className='insta-user__engagement'>
                <div className='engagement-rate'>
                  {/* <p>Engagement</p>
                  <p className='rate'>{stats.engagement_avg}%</p> */}
                  <div className='rating__container'>
                    <CircularProgressbar
                      percentage={store.user_global_percent}
                      initialAnimation={true}
                      strokeWidth={1}
                      className='progress-ring__circle-chart'
                      styles={{
                        path: { stroke: '#fff' }
                      }} />
                    <div className='rating__text'>
                      {store.user_global_rate}
                      <sup>&nbsp;/5</sup>
                    </div>
                  </div>

                  <div className='engagement-rate__bottom-group'>
                    <p>
                      <i className='fab fa-instagram' />
                      &nbsp; {store.user_stats.engagement_avg}%
                    </p>
                  </div>
                </div>

              </div>
              <ul className='insta-user__counts'>
                <li>
                  <p><i className='fas fa-heart' /></p>
                  <p>{stats.likes_avg}</p>
                </li>
                <li>
                  <p><i className='fas fa-comment' /></p>
                  <p>{stats.comments_avg}</p>
                </li>
                <li>
                  <p>Total <i className='fas fa-heart' title='Total Likes' /></p>
                  <p>{stats.likes_total}</p>
                </li>
                <li>
                  <p>Total <i className='fas fa-comment' title='Total Comments' /></p>
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
