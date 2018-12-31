import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './stores/store'
import TopBar from './components/top-bar/TopBar'
import Instagram from './components/instagram/Instagram'
import Login from './components/login/Login'
import Loader from './components/loader/Loader'
import Menu from './components/menu/Menu'
import './app.scss'

const App = observer(
  class App extends Component {

    componentDidMount() {
      store.checkPreviousAuth()
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
          <div className='app__inner'>
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
        </div>
      )
    }
  }
)

export default App
