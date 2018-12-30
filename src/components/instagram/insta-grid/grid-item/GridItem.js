import React, { Component } from 'react'

  class GridItem extends Component {

    render() {
      const item = {...this.props}
      const engagement = ((item.likes + item.comments) / item.followers) * 100
      console.log(engagement)
      return (
        <div className='grid-item__container'>
          <img src={item.imgUrl} />
          <div className='grid-item__analytics'>
            <p className='engagement-title'>
              {(engagement).toFixed(2)}%
            </p>
            <div className='analytics-interactions'>
              <p>
                <i className='fas fa-heart' />
                &nbsp;<span>{item.likes}</span>
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
