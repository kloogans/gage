import React from 'react'

const Loader = () => (
    <div className='loader animate__fade-in'>
      <div className='loader__shapes'>
	      <div className='loader__shape' />
	      <div className='loader__shape' />
        <div className='loader__logo-text'>
          <h3>g</h3>
        </div>
      </div>

      <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
	      <defs>
		      <filter id="logo-blur">
			      <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10' />
			      <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' result='goo' />
			      <feBlend in2='goo' in='SourceGraphic' result='mix' />
		      </filter>
	      </defs>
      </svg>
    </div>
)

export default Loader
