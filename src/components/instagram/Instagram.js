import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withRouter } from "react-router-dom"
import store from '../../stores/store'
import instagram from './stores/instagram'
import InstaGrid from './insta-grid/InstaGrid'
import InstaUser from './insta-user/InstaUser'
import NavTabs from '../nav-tabs/NavTabs'
import Loader from '../loader/Loader'

const Instagram = observer(
  class Instagram extends Component {

    componentDidMount() {
      this.props.history.push('/')
      console.log('pushed')
    }

    render() {
      if (instagram.instagram_post_data && instagram.instagram_user_data) {
        return (
          <div className='instagram animate__fade-in'>
            <NavTabs />
            <div className='instagram__content'>
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

export default withRouter(Instagram)
