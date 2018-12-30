import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './stores/store'
import TopBar from './components/top-bar/TopBar'
import Instagram from './components/instagram/Instagram'
import Login from './components/login/Login'
import Menu from './components/menu/Menu'
import './app.scss'

const App = observer(
  class App extends Component {

    componentDidMount() {
      const url = document.location
      const local = window.localStorage.getItem('access_token')
      let hash = url.hash
      if (hash || local) {
        if (hash) {
          hash = hash.substring(hash.indexOf('=') + 1)
          store.access_token = hash
          window.localStorage.setItem('access_token', hash)
          console.log('AUTH via hash')
        } else if (local) {
          store.access_token = localStorage.getItem('access_token')
          console.log('AUTH via Local')
        } else {
          console.log('Something is wrong')
        }
        store.authenticated = true
        store.getPostData()
        store.getUserData()
      } else {
        console.log('not logged in')
      }
    }

    checkLocalStorage = () => {
      const local = localStorage.getItem('access_token')
      if(local && local.length) {
        store.access_token = local
        store.authenticated = true
      }
    }
    render() {
      return (
        <div className='app__wrapper'>
          <TopBar />
          <Menu />
          <main className='app__content'>
            {
              store.authenticated
                ? <Instagram />
                : <Login />
            }
          </main>
        </div>
      )
    }
  }
)

export default App
