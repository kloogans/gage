import React from 'react'
import Footer from '../footer/Footer'
import { handleLogin } from '../../actions/authActions'

const Login = () => (
  <div className='login'>
    <h1 className='login__logo'>gage</h1>
    <h2 className='login__tagline text text--small text--white'>
      instant engagement insights
    </h2>
    <button onClick={handleLogin}
            className='login__button'
            title='Login with Instagram'>
      <i className='fab fa-instagram' />
      <p className='text text--medium-small text--white'>
        Login with Instagram
      </p>
    </button>
    <div className='login__speedometer' />
    <Footer />
  </div>
)

export default Login
