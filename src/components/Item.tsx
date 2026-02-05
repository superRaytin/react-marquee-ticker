import React from 'react'
import type { MarqueeTickerItemProps } from '../types'

const Item: React.FC<MarqueeTickerItemProps> = ({ children, className, style }) => {
  const finalClassName = className ? `ticker-item ${className}` : 'ticker-item'

  if (React.isValidElement(children)) {
    return (
      <div className={finalClassName} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div className={finalClassName} style={style}>
      <div className="ticker-mask">
        <div className="ticker-text">{children}</div>
      </div>
    </div>
  )
}

Item.displayName = 'MarqueeTicker.Item'

export default Item
