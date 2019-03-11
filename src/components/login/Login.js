import React from 'react'
import store from '../../stores/store'
import Footer from '../footer/Footer'

const Login = () => (
  <div className='login'>
    <h1 className='login__logo'>gage</h1>
    <h2 className='login__tagline text text--small text--white'>
      your social engagement stats
    </h2>
    <button onClick={store.handleLogin}
            className='login__button'
            title='Login with Instagram'>
      <i className='fab fa-instagram' />
      <p className='text text--medium text--white'>Get Started</p>
    </button>
    <div className='login__speedometer' />
    <Footer />
  </div>
)

export default Login
