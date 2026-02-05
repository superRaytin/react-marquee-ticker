import React from 'react'
import type { MarqueeTextProps } from '../types'

const MarqueeText: React.FC<MarqueeTextProps> = ({ children, style }) => (
  <div className="ticker-text" style={style}>
    {children}
  </div>
)

MarqueeText.displayName = 'MarqueeTicker.Text'

export default MarqueeText
