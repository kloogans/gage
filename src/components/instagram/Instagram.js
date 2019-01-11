import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import instagram from './stores/instagram'
import InstaGrid from './insta-grid/InstaGrid'
import InstaUser from './insta-user/InstaUser'
import NavTabs from '../nav-tabs/NavTabs'
import Loader from '../loader/Loader'

const Instagram = observer(
  class Instagram extends Component {

    componentDidMount() {
      instagram.initializeStore()
    }

    render() {
      if (instagram.instagram_post_data && instagram.instagram_user_data) {
        return (
          <div className='social__container animate__fade-in'>
            <NavTabs selected_service='instagram' />

            <div className='social__content-wrapper'>
              {
                store.toggle.user
                  ? <InstaUser />
                  : <InstaGrid />
              }
            </div>
          </div>
        )
      } else {
        return <Loader />
      }
    }

  }
)

export default Instagram
