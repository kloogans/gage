import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './stores/store'
import TopBar from './components/top-bar/TopBar'
import Instagram from './components/instagram/Instagram'
import Twitter from './components/twitter/Twitter'
import Login from './components/login/Login'
import Loader from './components/loader/Loader'
import Menu from './components/menu/Menu'
import Service from './containers/service/Service'
import Div100vh from 'react-div-100vh'
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

    changeRoute = route => this.props.history.push(route)

    render() {
      return (
        <Div100vh>
          <div className='app__wrapper'>
            <div className='app__inner'>
              <TopBar />
              <Menu />
              <div ref='scroll' />
              <main className='app__content'>
                <Router>
                  <Switch>
                    <Route exact path='/'
                                 render={() => {
                                   if (store.authenticated) {
                                     return <Service selected_service={'home'} />
                                   } else {
                                     return <Login />
                                   }
                    }} />
                    <Route path='/instagram' render={() => {
                      return <Service selected_service={'instagram'} />
                    }} />

                    <Route path='/twitter' render={() => {
                      return <Service selected_service={'twitter'} />
                    }} />
                  </Switch>
                </Router>
              </main>
            </div>
          </div>
        </Div100vh>
      )
    }
  }
)

export default App
