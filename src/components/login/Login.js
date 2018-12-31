import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import Footer from '../footer/Footer'

const Login = ({}) => (
  <div className='login__container'>
    <h1>gage</h1>
    <div className='login__buttons'>
      <a href={store.login_url}>
        <i className='fab fa-instagram' />
        <span>&nbsp;Instagram</span>
      </a>
      <a href={store.login_url}>
        <i className='fab fa-facebook' />
        <span>&nbsp;Facebook</span>
      </a>
      <a href={store.login_url}>
        <i className='fab fa-twitter' />
        <span>&nbsp;Twitter</span>
      </a>
    </div>
    <Footer />
  </div>
)

export default Login
