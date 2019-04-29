import React from 'react'
import EngagementBox from '../../shared/engagement-box/EngagementBox'
import InstaHeader from './insta-header/InstaHeader'
import InstaUserCounts from './insta-user-counts/InstaUserCounts'
import InstaMediaCounts from './insta-media-counts/InstaMediaCounts'
import instagram from '../stores/instagram'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import { formatNum } from '../../../actions/utilityActions'

const InstaUser = observer(props => {

  const style = {
    transform: `translateX(${store.animate.right ? '50%' : '-60%'})`,
    opacity: store.animate.right ? 1 : 0
  }

  if (instagram.instagram_user_data) {
    const ig = instagram.instagram_user_data.data,
          stats = instagram.user_stats

    return (
      <section style={style} className='app__section'>

        <InstaHeader
            img={ig.profile_picture}
            name={ig.full_name}
            username={ig.username} />

        <div className='instagram__stats'>

          <InstaUserCounts
              posts={ig.counts.media}
              followers={formatNum(stats.followers)}
              following={formatNum(ig.counts.follows)} />

          <EngagementBox
              rates={instagram.user_stats.engagement_avg}
              ratio={instagram.user_stats.ff_ratio}
              averageLikes={formatNum(stats.likes_avg)}
              averageComments={stats.comments_avg} />

          <InstaMediaCounts
              averageLikes={formatNum(stats.likes_avg)}
              totalLikes={formatNum(stats.likes_total)}
              averageComments={stats.comments_avg}
              totalComments={stats.comments_total} />


        </div>
      </section>
    )
  } else {
    return 'Loading...'
  }
})

export default InstaUser
