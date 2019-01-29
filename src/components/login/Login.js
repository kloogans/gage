import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import instagram from '../instagram/stores/instagram'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'

const Login = p => (
  <div className='login__container'>
    <h1>gage</h1>
    <div className='login__buttons'>
      <button onClick={instagram.handleLogin} title='Login with Instagram'>
        <i className='fab fa-instagram' />
      </button>
      <Link to='twitter' title='Login with Twitter'>
        <i className='fab fa-twitter' />
      </Link>
    </div>
    <Footer />
  </div>
)

export default Login
