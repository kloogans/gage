import React from 'react'
import { observer } from 'mobx-react'
import store from '../../../stores/store'

const ServicePlaceholder = observer((p) => (
  <div className='placeholder__container'>
    <i className={`fab fa-${(p.service).toLowerCase()}`} />
    <div className='placeholder__content'>
      <p className='text--medium-small text__weight--medium text__shade--light'>
        Login with {p.service} to get started.
      </p>
      <a href={p.login_url}
         title={`Login with ${p.service}`}>
        Go
      </a>
    </div>
  </div>
))

export default ServicePlaceholder
