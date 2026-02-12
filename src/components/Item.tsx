import React from 'react'
import type { MarqueeTickerItemProps } from '../types'

const Item: React.FC<MarqueeTickerItemProps> = ({ children, className, style, onClick }) => {
  const finalClassName = className ? `ticker-item ${className}` : 'ticker-item'

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e)
    }
  }

  if (React.isValidElement(children)) {
    return (
      <div className={finalClassName} style={style} onClick={handleClick}>
        {children}
      </div>
    )
  }

  return (
    <div className={finalClassName} style={style} onClick={handleClick}>
      <div className="ticker-mask">
        <div className="ticker-text">{children}</div>
      </div>
    </div>
  )
}

Item.displayName = 'MarqueeTicker.Item'

export default Item
