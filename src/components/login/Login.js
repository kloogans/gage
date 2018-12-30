import React from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const Login = ({}) => (
  <div className='login__container'>
    <a href={store.login_url}>
      Login
    </a>
  </div>
)

export default Login
