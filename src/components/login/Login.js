import React from 'react'
import instagram from '../instagram/stores/instagram'
import Footer from '../footer/Footer'

const Login = p => (
  <div className='login__container'>
    <h1>gage</h1>
    <div className='login__buttons'>
      <button onClick={instagram.handleLogin} title='Login with Instagram'>
        <i className='fab fa-instagram' />
      </button>
    </div>
    <Footer />
  </div>
)

export default Login
