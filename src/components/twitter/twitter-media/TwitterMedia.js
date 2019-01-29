import React, { Component } from 'react'
import { observer } from 'mobx-react'
import twitter from '../stores/twitter'
import moment from 'moment'
import * as mobx from 'mobx'
const scrape_urls = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

const TwitterMedia = observer(
  class TwitterMedia extends Component {

    linkify = text => text.replace(scrape_urls, u => <a href={u}>u</a>)

    render() {
      const data = mobx.toJS(twitter.twitter_posts_data)
      return (
        <div className='twitter-media animate__fade-in--long'>
          {
            data.map(p => {
              let text = p.text
              return <div key={p.id} className='twitter-media__post'>
                <div className='post__top-bar'>
                  <div className='post__user'>
                    <img src={twitter.twitter_user_data.profile_image}
                         alt={twitter.twitter_user_data.screen_name}/>
                    <p className='text text--medium text__weight--heavy text--no-margin'>
                      {twitter.twitter_user_data.screen_name}
                    </p>
                  </div>
                  <p className='text text--small text--light'>
                    {moment(p.created_at).fromNow()}
                  </p>
                </div>
                <p className='text text__margin--15-0'>
                  {text}
                </p>
                <ul>
                  <li>
                    <i className='fas fa-heart text--small text__shade--light' />
                    <p className='text text--small text__shade--light text__weight--heavy'>
                      {p.favorite_count}
                    </p>
                  </li>
                  <li>
                    <i className='fas fa-retweet text--small text__shade--light' />
                    <p className='text text--small text__shade--light text__weight--heavy'>
                      {p.retweet_count}
                    </p>
                  </li>
                  <li>
                    <i className='fas fa-users text--small text__shade--light' />
                    <p className='text text--small text__shade--light text__weight--heavy'>
                      10%
                    </p>
                  </li>
                </ul>
              </div>
            })
          }
        </div>
      )
    }

  }
)

export default TwitterMedia
