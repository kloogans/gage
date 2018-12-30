import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import * as mobx from 'mobx'

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

    render() {
      if (store.instagram_user_data) {
        const ig = mobx.toJS(store.instagram_user_data)
        const data= ig.data
        console.log(data)
        return (
          <div className='app__section'>
            <div className='insta-user__image-wrapper'>
              <img src={data.profile_picture} />
            </div>
            <p className='insta-user__username'>
              {data.username}
            </p>
            <ul className='insta-user__counts'>
              <li>
                <p>Posts</p>
                <p>{data.counts.media}</p>
              </li>
              <li>
                <p>Followers</p>
                <p>{data.counts.followed_by}</p>
              </li>
              <li>
                <p>Following</p>
                <p>{data.counts.follows}</p>
              </li>
            </ul>
            <div className='insta-user__engagement'>
              <p>Engagement</p>
              <p>0%</p>
            </div>
            <ul className='insta-user__counts'>
              <li>
                <p>Likes</p>
                <p>4232</p>
              </li>
              <li>
                <p>Comments</p>
                <p>342</p>
              </li>
            </ul>
          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default InstaUser
