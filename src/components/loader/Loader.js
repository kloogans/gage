import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = props => (
    <ContentLoader
  		height={500}
  		width={400}
  		speed={2}
  		primaryColor="#f3f3f3"
  		secondaryColor="#ecebeb"
      className='animate__fade-in'
  		{...props}
  	>
  		<rect x="137" y="143" rx="4" ry="4" width="117" height="6.4" />
  		<rect x="100" y="27" rx="3" ry="3" width="85" height="6.4" />
  		<rect x="22" y="177" rx="3" ry="3" width="350" height="43.78" />
  		<rect x="-6.22" y="240" rx="3" ry="3" width="410.4" height="105.15" />
  		<rect x="-1.56" y="369" rx="3" ry="3" width="408.03" height="71.42" />
  		<circle cx="194" cy="95" r="30" />
  		<rect x="203" y="28" rx="3" ry="3" width="85" height="6.4" />
	  </ContentLoader>
)

export default Loader
