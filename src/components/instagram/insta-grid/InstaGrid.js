import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'
import * as mobx from 'mobx'
import GridItem from './grid-item/GridItem'

const InstaGrid = observer(
  class InstaGrid extends Component {

    render() {
      if (store.instagram_post_data) {
        const ig = mobx.toJS(store.instagram_post_data)
        const ig_user = mobx.toJS(store.instagram_user_data)
        const user_data = ig_user.data
        const data = ig.data
        const images = data.map(post => {
          return <GridItem key={post.id}
                           followers={user_data.counts.followed_by}
                           comments={post.comments.count}
                           likes={post.likes.count}
                           imgUrl={post.images.standard_resolution.url}
                           time={post.created_time}
                           link={post.link} />

        })
        console.log('grid: ', ig)
        return (
          <div className={store.toggle.grid ? 'insta-grid__container' : 'insta-grid__container'}>
            {images}
          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default InstaGrid
