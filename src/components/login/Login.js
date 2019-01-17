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
      <button onClick={instagram.handleLogin}>
        <i className='fab fa-instagram' />
        <span>&nbsp;Instagram</span>
      </button>
      <button>
        <i className='fab fa-facebook' />
        <span>&nbsp;Facebook</span>
      </button>
      <Link to='twitter'>
        <i className='fab fa-twitter' />
        <span>&nbsp;Twitter</span>
      </Link>
    </div>
    <Footer />
  </div>
)

export default Login
