import React from 'react'
import type { MarqueeMaskProps } from '../types'

const MarqueeMask: React.FC<MarqueeMaskProps> = ({ children, style }) => (
  <div className="ticker-mask" style={style}>
    {children}
  </div>
)

MarqueeMask.displayName = 'MarqueeTicker.Mask'

export default MarqueeMask
