import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Login = ({}) => (
  <div className='login__container'>
    <h1>gage</h1>
    <a href={store.login_url}>
      <i className='fab fa-instagram' />
      &nbsp;Login
    </a>
  </div>
)

export default Login
