import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = props => (
    <div className='loader__wrapper animate__fade-in'>
      <div className='loader__wrapper'>
      <div className="blobs">
	      <div className="blob" />
	      <div className="blob" />
        <div className="apester">
          <h3>g</h3>
        </div>
      </div>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
	      <defs>
		      <filter id="goo">
			      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
			      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"      result="goo" />
			      <feBlend in2="goo" in="SourceGraphic" result="mix" />
		      </filter>
	      </defs>
      </svg>
    </div>
    </div>
)

export default Loader
