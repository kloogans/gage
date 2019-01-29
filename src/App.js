import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import store from './stores/store'
import TopBar from './components/top-bar/TopBar'
import Instagram from './components/instagram/Instagram'
import Twitter from './components/twitter/Twitter'
import Facebook from './components/facebook/Facebook'
import Login from './components/login/Login'
import Loader from './components/loader/Loader'
import Menu from './components/menu/Menu'
import Service from './containers/service/Service'
import Div100vh from 'react-div-100vh'
import './app.scss'

const history = createHistory()

const App = observer(
  class App extends Component {

    componentDidMount() {
      store.checkAuth()
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
      console.log(store.authenticated)
      return (
        <Router>
        <Div100vh>
          <div className='app__wrapper'>
            <div className='app__inner'>
              <TopBar />
              <Menu />
              <div ref='scroll' />
              <main className='app__content'>
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

                    <Route path='/facebook' render={() => {
                      return <Service selected_service={'facebook'} />
                    }} />
                  </Switch>
              </main>
            </div>
          </div>
        </Div100vh>
      </Router>
      )
    }
  }
)

export default App
