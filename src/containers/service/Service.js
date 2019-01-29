import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import Twitter from '../../components/twitter/Twitter'
import Facebook from '../../components/facebook/Facebook'
import NavTabs from '../../components/nav-tabs/NavTabs'
import Instagram from '../../components/instagram/Instagram'
import Dashboard from '../../components/dashboard/Dashboard'

const Service = observer(
  class Service extends Component {

    componentDidMount() {
      window.addEventListener("scroll", this._scroll)
    }

    _scroll = () => {
      const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            hideOn = 7,
            headerEl = this.refs.scroll
      if (distanceY > hideOn) {
        store.hide_tabs = true
      } else {
        store.hide_tabs = false
      }
    }

    render() {
      const props = this.props
      if (props.selected_service === 'home') {
        return (
          <div className='service__container'>
            <Dashboard />
          </div>
        )
      } else if (props.selected_service === 'instagram') {
        return (
          <div className='service__container'>
            <Instagram />
          </div>
        )
      } else if (props.selected_service === 'twitter') {
        return (
          <div className='service__container'>
            <Twitter />
          </div>
        )
      } else if (props.selected_service === 'facebook') {
        return (
          <div className='service__container'>
            <Facebook />
          </div>
        )
      }
    }

  }
)

export default Service
