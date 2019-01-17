import React, { Component } from 'react'
import NavTabs from '../nav-tabs/NavTabs'
import TwitterUser from './twitter-user/TwitterUser'
import { observer } from 'mobx-react'
import * as mobx from 'mobx'
import store from '../../stores/store'
import twitter from './stores/twitter'

const Twitter = observer(
  class Twitter extends Component {

    componentDidMount() {
      twitter.checkLocalStorage()
    }

    getUserData = () => {
      twitter.getTwitterUserData(this.refs.twitter_username.value)
    }

    render() {
      if (twitter.twitter_username) {
        if (twitter.twitter_loading) {
          return 'Loading...'
        } else {
          const data = mobx.toJS(twitter.twitter_user_data)
          const posts = mobx.toJS(twitter.twitter_posts_data)
          const averages = mobx.toJS(twitter.twitter_averages)
          return (
            <div className='social__container'>
              <NavTabs selected_service='twitter' />
              <div className='social__content-wrapper'>
                <TwitterUser data={data} averages={averages} />
              </div>
            </div>
          )
        }
      } else {
        return (
          <div className='social__container'>
            <div className='social__content-wrapper'>
              <input type='text'
                     ref='twitter_username'
                     onSubmit={this.getUserData}
                     placeholder='twitter username' />
              <button onClick={this.getUserData}>
                Go
              </button>
            </div>
          </div>
        )
      }
    }

  }
)

export default Twitter
