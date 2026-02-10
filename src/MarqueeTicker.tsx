import React from 'react'
import type { MarqueeTickerProps, MarqueTickerItemData } from './types'
import Item from './components/Item'
import Mask from './components/Mask'
import Text from './components/Text'
import { renderSlot } from './utils'
import useTicker from './useTicker'
import './MarqueeTicker.style'

export default function MarqueeTicker(props: MarqueeTickerProps) {
  const { style = {}, className, itemHeight, placeholder, prefix, suffix } = props

  const { items, containerRef } = useTicker(props)

  const renderItem = (item: MarqueTickerItemData, index: number) => {
    if (React.isValidElement(item.content)) {
      const existingProps = (item.content.props || {}) as any
      const newItem = React.cloneElement(item.content, {
        ...existingProps,
        style: {
          ...(existingProps.style || {}),
          height: itemHeight,
        },
      })
      return newItem
    }

    return (
      <div key={index} style={{ height: `${itemHeight}` }} className="ticker-item">
        <div className="ticker-mask">
          <div className="ticker-text">{item.content || placeholder}</div>
        </div>
      </div>
    )
  }

  const finalClassName = className ? `react-marquee-ticker ${className}` : 'react-marquee-ticker'

  return (
    <div ref={containerRef} className={finalClassName} style={style}>
      {renderSlot(prefix)}
      <div className="react-marquee-ticker-list-wrapper" style={{ height: itemHeight }}>
        {items && items.length && (
          <div className="react-marquee-ticker-list">{items.map(renderItem)}</div>
        )}
      </div>
      {renderSlot(suffix)}
    </div>
  )
}

MarqueeTicker.Item = Item

MarqueeTicker.Mask = Mask

MarqueeTicker.Text = Text
