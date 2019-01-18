import React, { Component } from 'react'
import twitter from '../stores/twitter'
import store from '../../../stores/store'
import { observer } from 'mobx-react'

const TwitterInput = observer(
  class TwitterInput extends Component {
    state={
      input_error: false,
      input_error_msg: null
    }

    getUserData = e => {
      e.preventDefault()
      const username = this.refs.twitter_username.value
      if (username.length > 0) {
        twitter.getTwitterUserData(this.refs.twitter_username.value)
        store.authenticated = true
        twitter.authenticated = true
      }
    }

    render() {
      return (
        <form onClick={this.getUserData} className='twitter-input'>
          <input type='text'
                 ref='twitter_username'
                 onSubmit={this.getUserData}
                 placeholder='twitter username' />
          <button onClick={this.getUserData}>
            Go
          </button>
        </form>
      )
    }

  }
)

export default TwitterInput;
