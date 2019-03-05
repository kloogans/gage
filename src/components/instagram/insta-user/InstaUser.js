import React from 'react'
import EngagementBox from '../../shared/engagement-box/EngagementBox'
import InstaHeader from './insta-header/InstaHeader'
import InstaUserCounts from './insta-user-counts/InstaUserCounts'
import InstaMediaCounts from './insta-media-counts/InstaMediaCounts'
import instagram from '../stores/instagram'
import { observer } from 'mobx-react'
import store from '../../../stores/store'

const InstaUser = observer(props => {

  if (instagram.instagram_user_data) {
    const ig = instagram.instagram_user_data.data,
          stats = instagram.user_stats

    return (
      <div className='app__section animate__fade-in--long'>

        <InstaHeader
            img={ig.profile_picture}
            name={ig.full_name}
            username={ig.username} />

        <div className='instagram__stats'>

          <InstaUserCounts
              posts={ig.counts.media}
              followers={store.formatNum(stats.followers)}
              following={store.formatNum(ig.counts.follows)} />

          <EngagementBox rates={instagram.user_stats.engagement_avg} />

          <InstaMediaCounts
              averageLikes={store.formatNum(stats.likes_avg)}
              totalLikes={store.formatNum(stats.likes_total)}
              averageComments={stats.comments_avg}
              totalComments={stats.comments_total} />


        </div>
      </div>
    )
  } else {
    return 'Loading...'
  }
})

export default InstaUser
