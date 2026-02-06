import { useState, useEffect, useRef } from 'react'
import type { MarqueeTickerProps, MarqueTickerItemData, Timer } from './types'
import { normalizeItemsFromChildren, normalizeItemsFromProps, useEvent } from './utils'

export default function useTicker(props: MarqueeTickerProps) {
  const {
    itemHeight,
    interval = 3000,
    speed = 400,
    autoMarquee = true,
    marqueeSpeed = 30,
    marqueeDelayBeforeScroll = 300,
    marqueeDelayAfterScroll = 0,
    singleLine,
    paused,
    children,
  } = props

  const [items, setItems] = useState<MarqueTickerItemData[]>([])

  const containerRef = useRef<HTMLDivElement | null>(null)
  const _moveTimer = useRef<Timer>(null)
  const _pauseRetryTimer = useRef<Timer>(null)
  const _shiftTimer = useRef<Timer>(null)

  useEffect(() => {
    if (props.items) {
      setItems(normalizeItemsFromProps(props.items))
    } else if (children) {
      setItems(normalizeItemsFromChildren(children))
    }
  }, [props.items])

  useEffect(() => {
    return () => stop()
  }, [])

  useEffect(() => {
    if (items && items.length > 1) start()
  }, [items])

  useEffect(() => {
    if (containerRef?.current) init()
  }, [containerRef.current])

  const init = () => {
    const listContainer = containerRef.current?.querySelector<HTMLElement>(
      '.react-marquee-ticker-list',
    )
    if (!listContainer) return

    listContainer.style.cssText = 'margin-top: 0'

    containerRef.current?.classList[autoMarquee ? 'add' : 'remove'](
      'react-marquee-ticker-auto-marquee',
    )
    containerRef.current?.classList[singleLine ? 'add' : 'remove'](
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

  const move = useEvent(() => {
    if (paused) {
      stop()
      _pauseRetryTimer.current = setTimeout(move, interval)
      return
    }

    if (_pauseRetryTimer.current) clearTimeout(_pauseRetryTimer.current)

    step()
  })

  const step = () => {
    const listContainer = containerRef.current?.querySelector<HTMLElement>(
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

  const stop = () => {
    if (_moveTimer.current) clearTimeout(_moveTimer.current)
    if (_pauseRetryTimer.current) clearTimeout(_pauseRetryTimer.current)
    if (_shiftTimer.current) clearTimeout(_shiftTimer.current)
  }

  const applyMarquee = () => {
    const listContainer = containerRef.current?.querySelector<HTMLElement>(
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

  return { items, containerRef }
}