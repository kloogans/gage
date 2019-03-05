import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from './stores/store'
import TopBar from './components/top-bar/TopBar'
import Instagram from './components/instagram/Instagram'
import Login from './components/login/Login'
import Menu from './components/menu/Menu'
import Div100vh from 'react-div-100vh'
import './app.scss'

const App = observer(
  class App extends Component {

    componentDidMount() {
      store.checkAuth()
    }

    render() {
      console.log(store.authenticated)
      return (
        <Div100vh>
          <div className='app'>
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
        </Div100vh>
      )
    }
  }
)

export default App
