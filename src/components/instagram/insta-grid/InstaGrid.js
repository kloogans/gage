import React from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import instagram from '../stores/instagram'
import Loader from '../../loader/Loader'
import GridItem from './grid-item/GridItem'

const InstaGrid = observer(() => {

  if (instagram.instagram_post_data) {
    const ig = instagram.instagram_post_data.data,
          ig_user = instagram.instagram_user_data.data,
          style = {
            transform: `translateX(${store.animate.right ? '100%' : '-50%'})`,
            opacity: store.animate.right ? 0 : 1
          },
          grid_items = ig.map(post => {
            return <GridItem key={post.id}
                             followers={ig_user.counts.followed_by}
                             username={ig_user.username}
                             comments={post.comments.count}
                             likes={post.likes.count}
                             imgUrl={post.images.standard_resolution.url}
                             time={post.created_time}
                             link={post.link} />
          })

    return (
      <section style={ style } className='app__section'>
        <div className='insta-grid'>
          {grid_items}
        </div>
      </section>
    )
  } else {
    return <Loader />
  }
})

export default InstaGrid
