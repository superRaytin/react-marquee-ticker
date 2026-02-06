import React, { useState, useEffect, useRef } from 'react'
import type { MarqueeTickerProps, MarqueTickerItemData, SlotRender, Timer } from './types'
import Item from './components/Item'
import MarqueeMask from './components/Mask'
import MarqueeText from './components/Text'
import './MarqueeTicker.style'
import { normalizeItemsFromChildren, normalizeItemsFromProps } from './utils'

export default function MarqueeTicker(props: MarqueeTickerProps) {
  const {
    style = {},
    className,
    itemHeight,
    interval = 3000,
    speed = 400,
    placeholder,
    autoMarquee = true,
    marqueeSpeed = 30,
    marqueeDelayBeforeScroll = 300,
    marqueeDelayAfterScroll = 0,
    singleLine,
    paused,
    prefix,
    suffix,
    children,
  } = props

  const [items, setItems] = useState<MarqueTickerItemData[]>([])

  const _containerRef = useRef<HTMLDivElement | null>(null)
  const _moveTimer = useRef<Timer>(null)
  const _pauseRetryTimer = useRef<Timer>(null)
  const _shiftTimer = useRef<Timer>(null)

  useEffect(() => {
    return () => stop()
  }, [])

  useEffect(() => {
    if (props.items) {
      setItems(normalizeItemsFromProps(props.items))
    } else if (children) {
      setItems(normalizeItemsFromChildren(children))
    }
  }, [props.items, children])

  useEffect(() => {
    if (_containerRef?.current) init()
  }, [_containerRef.current])

  useEffect(() => {
    if (items && items.length > 1) start()
  }, [items])

  const init = () => {
    const listContainer = _containerRef.current?.querySelector<HTMLElement>(
      '.react-marquee-ticker-list',
    )
    if (!listContainer) return

    listContainer.style.cssText = 'margin-top: 0'

    _containerRef.current?.classList[autoMarquee ? 'add' : 'remove'](
      'react-marquee-ticker-auto-marquee',
    )
    _containerRef.current?.classList[singleLine ? 'add' : 'remove'](
      'react-marquee-ticker-single-line',
    )

    stop()

    if (items && items.length > 1) start()
  }

  const start = () => {
    let marqueeTime = 0
    if (autoMarquee) {
      marqueeTime = applyMarquee() || 0
    }

    _moveTimer.current = setTimeout(move, interval + marqueeTime)
  }

  const move = () => {
    if (paused) {
      stop()
      _pauseRetryTimer.current = setTimeout(move, interval)
      return
    }

    if (_pauseRetryTimer.current) clearTimeout(_pauseRetryTimer.current)

    step()
  }

  const step = () => {
    const listContainer = _containerRef.current?.querySelector<HTMLElement>(
      '.react-marquee-ticker-list',
    )
    if (!listContainer) return

    listContainer.style.cssText = `margin-top: -${itemHeight}; transition: ${speed}ms`

    _shiftTimer.current = setTimeout(() => {
      const newItems = [...items]
      const firstItem = newItems.shift()
      if (firstItem) newItems.push(firstItem)

      setItems(newItems)

      listContainer.style.cssText = 'margin-top: 0'
    }, speed)
  }

  const applyMarquee = () => {
    const listContainer = _containerRef.current?.querySelector<HTMLElement>(
      '.react-marquee-ticker-list',
    )
    if (!listContainer) return

    const listItemEls = listContainer.querySelectorAll('.ticker-item')

    if (!listItemEls.length) return

    listItemEls.forEach((item: Element) => {
      const text = item.querySelector<HTMLElement>('.ticker-text')
      if (text) text.classList.remove('marquee')
    })

    const firstItemEl = listItemEls[0]

    const maskEl = firstItemEl.querySelector<HTMLElement>('.ticker-mask')
    const textEl = firstItemEl.querySelector<HTMLElement>('.ticker-text')

    if (!maskEl || !textEl) return

    const maskWidth = maskEl.offsetWidth
    const textWidth = textEl.scrollWidth

    if (textWidth <= maskWidth) return

    const scrollX = maskWidth - textWidth
    const scrollTime = Math.abs(scrollX) / marqueeSpeed

    textEl.style.setProperty('--scroll-x', `${scrollX}px`)
    textEl.style.setProperty('--marquee-duration', `${scrollTime}s`)

    setTimeout(() => {
      textEl.classList.add('marquee')
    }, marqueeDelayBeforeScroll)

    const stayDuration = scrollTime * 1000 + marqueeDelayAfterScroll + marqueeDelayBeforeScroll
    return stayDuration
  }

  const stop = () => {
    if (_moveTimer.current) clearTimeout(_moveTimer.current)
    if (_pauseRetryTimer.current) clearTimeout(_pauseRetryTimer.current)
    if (_shiftTimer.current) clearTimeout(_shiftTimer.current)
  }

  const renderSlot = (slot: SlotRender) => {
    if (typeof slot === 'function') {
      return slot()
    }
    return slot
  }

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

  const renderList = () => {
    if ((!items || !items.length) && !children) return null
    return <div className="react-marquee-ticker-list">{items.map(renderItem)}</div>
  }

  const finalClassName = className ? `react-marquee-ticker ${className}` : 'react-marquee-ticker'

  return (
    <div ref={_containerRef} className={finalClassName} style={style}>
      {renderSlot(prefix)}
      <div className="react-marquee-ticker-list-wrapper" style={{ height: itemHeight }}>
        {renderList()}
      </div>
      {renderSlot(suffix)}
    </div>
  )
}

MarqueeTicker.Item = Item

MarqueeTicker.Mask = MarqueeMask

MarqueeTicker.Text = MarqueeText
