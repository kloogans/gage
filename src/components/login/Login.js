import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import instagram from '../instagram/stores/instagram'
import Footer from '../footer/Footer'

const Login = ({}) => (
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
      <button>
        <i className='fab fa-twitter' />
        <span>&nbsp;Twitter</span>
      </button>
    </div>
    <Footer />
  </div>
)

export default Login
