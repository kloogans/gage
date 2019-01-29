import React, { Component } from 'react'
import store from '../../../../stores/store'

  class GridItem extends Component {

    render() {
      const item = {...this.props},
            engagement = ((item.likes + item.comments) / item.followers) * 100
      return (
        <div className='grid-item__container'>
          <div className='grid-item__image'>
            <img src={item.imgUrl} alt={'A photo by ' + item.username} />
          </div>
          <div className='grid-item__analytics'>
            <p className='engagement-title'>
              {(engagement).toFixed(2)}%
            </p>
            <div className='analytics-interactions'>
              <p>
                <i className='fas fa-heart' />
                &nbsp;<span>{store.formatNum(item.likes)}</span>
              </p>
              <p>
                <i className='fas fa-comment' />
                &nbsp;<span>{item.comments}</span>
              </p>
            </div>
          </div>
        </div>
      )
    }
  }

export default GridItem
