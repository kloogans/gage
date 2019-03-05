import React from 'react'
import instagram from '../instagram/stores/instagram'
import Footer from '../footer/Footer'

const Login = () => (
  <div className='login'>
    <h1 className='login__logo'>gage</h1>
    <button onClick={instagram.handleLogin}
            className='login__button'
            title='Login with Instagram'>
      <i className='fab fa-instagram' />
    </button>
    <Footer />
  </div>
)

export default Login
