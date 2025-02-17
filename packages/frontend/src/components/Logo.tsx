import React from 'react'

const Logo: React.FC<{ size: 'lg' | 'sm' }> = ({ size }) => (
  <p
    className={`text-center font-extrabold shadow-neoncyan select-none ${
      size === 'lg' ? 'text-6xl text-shadow-xl' : 'text-lg text-shadow-sm'
    }`}
  >
    <span className="text-electricblue">Deep</span>
    <span className="text-white">Shortigin</span>
  </p>
)

export default Logo
