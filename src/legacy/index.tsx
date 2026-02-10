import React from 'react'
import type { ReactNode } from 'react'
import type { SlotRender, Timer } from '../types'
import '../MarqueeTicker.style'

type MarqueeTickerItem = ReactNode | string

export interface MarqueeTickerProps {
  // Data
  items?: MarqueeTickerItem[]
  placeholder?: string

  // Layout
  itemHeight: string
  style?: React.CSSProperties
  className?: string
  itemClassName?: string
  singleLine?: boolean

  // Vertical scrolling
  interval?: number
  speed?: number

  // Horizontal (overflow) scrolling
  autoMarquee?: boolean
  marqueeSpeed?: number
  marqueeDelayBeforeScroll?: number
  marqueeDelayAfterScroll?: number

  // Slots
  prefix?: SlotRender
  suffix?: SlotRender

  children?: ReactNode[]
}

interface MarqueeTickerStates {
  items: MarqueeTickerItem[]
  paused: boolean
}

export default class MarqueeTicker extends React.Component<
  MarqueeTickerProps,
  MarqueeTickerStates
> {
  constructor(props: MarqueeTickerProps) {
    super(props)
    this.state = {
      items: props.items || props.children || [],
      paused: false,
    }
  }

  _containerRef: any = null

  _moveTimer: Timer = null
  _pauseRetryTimer: Timer = null
  _shiftTimer: Timer = null

  componentDidMount(): void {
    this.init()
  }

  componentWillReceiveProps(nextProps: Readonly<MarqueeTickerProps>): void {
    if (nextProps.items && nextProps.items.length) {
      if (JSON.stringify(nextProps.items) === JSON.stringify(this.props.items)) return
      this.setState({ items: nextProps.items }, this.init)
    } else if (
      nextProps.children &&
      nextProps.children !== this.props.children &&
      React.isValidElement(nextProps.children)
    ) {
      this.setState({ items: nextProps.children }, this.init)
    }
  }

  componentWillUnmount(): void {
    this.stop()
  }

  init = () => {
    const { items } = this.state
    const { autoMarquee, singleLine } = this.props
    const listContainer = this._containerRef.querySelector('.react-marquee-ticker-list')

    listContainer.style.cssText = 'margin-top: 0'

    this._containerRef.classList[autoMarquee ? 'add' : 'remove'](
      'react-marquee-ticker-auto-marquee',
    )
    this._containerRef.classList[singleLine ? 'add' : 'remove']('react-marquee-ticker-single-line')

    this.stop()

    if (items && items.length > 1) {
      this.start()
    }
  }

  step = () => {
    const { itemHeight, speed, autoMarquee, interval } = this.props
    const listContainer = this._containerRef.querySelector('.react-marquee-ticker-list')

    listContainer.style.cssText = `margin-top: -${itemHeight}; transition: ${speed}ms`

    this._shiftTimer = setTimeout(() => {
      const newItems = [...this.state.items]
      const firstItem = newItems.shift()
      newItems.push(firstItem)

      this.setState({ items: newItems }, () => {
        listContainer.style.cssText = 'margin-top: 0'

        let marqueeTime = 0
        if (autoMarquee) {
          marqueeTime = this.applyMarquee() || 0
        }

        this._moveTimer = setTimeout(this.move, interval + marqueeTime)
      })
    }, speed)
  }

  move = () => {
    const { paused } = this.state
    if (paused) {
      this.stop()
      this._pauseRetryTimer = setTimeout(this.move, this.props.interval)
      return
    }

    if (this._pauseRetryTimer) clearTimeout(this._pauseRetryTimer)

    this.step()
  }

  start = () => {
    const { interval, autoMarquee } = this.props

    let marqueeTime = 0
    if (autoMarquee) {
      marqueeTime = this.applyMarquee() || 0
    }

    this._moveTimer = setTimeout(this.move, interval + marqueeTime)
  }

  stop = () => {
    if (this._moveTimer) clearTimeout(this._moveTimer)
    if (this._pauseRetryTimer) clearTimeout(this._pauseRetryTimer)
    if (this._shiftTimer) clearTimeout(this._shiftTimer)
  }

  pause = () => {
    this.setState({ paused: true })
  }

  unpause = () => {
    this.setState({ paused: false })
  }

  applyMarquee = () => {
    const { marqueeSpeed, marqueeDelayBeforeScroll, marqueeDelayAfterScroll } = this.props

    const listContainer = this._containerRef.querySelector('.react-marquee-ticker-list')
    const listItemEls = listContainer.querySelectorAll('.ticker-item')

    if (!listItemEls.length) return

    listItemEls.forEach((item: Element) => {
      const text = item.querySelector('.ticker-text')
      text && text.classList.remove('marquee')
    })

    const firstItemEl = listItemEls[0]

    const maskEl = firstItemEl.querySelector('.ticker-mask')
    const textEl = firstItemEl.querySelector('.ticker-text')

    if (!maskEl || !textEl) return

    const maskWidth = maskEl.offsetWidth
    const textWidth = textEl.scrollWidth

    if (textWidth <= maskWidth) return

    const scrollX = maskWidth - textWidth
    const scrollTime = Math.abs(scrollX) / marqueeSpeed

    textEl.style.setProperty('--scroll-x', `${scrollX}px`)
    textEl.style.setProperty('--marquee-duration', `${scrollTime}s`)

    setTimeout(() => {
      textEl.offsetHeight
      textEl.classList.add('marquee')
    }, marqueeDelayBeforeScroll)

    const stayDuration = scrollTime * 1000 + marqueeDelayAfterScroll + marqueeDelayBeforeScroll
    return stayDuration
  }

  renderSlot = (slot: SlotRender) => {
    if (typeof slot === 'function') {
      return slot()
    }
    return slot
  }

  renderItem = (item: MarqueeTickerItem) => {
    const { itemClassName, itemHeight, placeholder } = this.props

    if (React.isValidElement(item)) {
      const existingProps = (item.props || {}) as any
      const newItem = React.cloneElement(item, {
        ...existingProps,
        style: {
          ...(existingProps.style || {}),
          height: itemHeight,
        },
      })
      return newItem
    }

    const finalItemClassName = itemClassName ? `ticker-item ${itemClassName}` : 'ticker-item'

    return (
      <div className={finalItemClassName} style={{ height: `${itemHeight}` }}>
        <div className="ticker-mask">
          <div className="ticker-text">{item || placeholder}</div>
        </div>
      </div>
    )
  }

  renderList = () => {
    const { items } = this.state

    return <div className="react-marquee-ticker-list">{items.map(this.renderItem)}</div>
  }

  render() {
    const { items } = this.state
    const { style = {}, className, itemHeight, prefix, suffix } = this.props

    if (!items || !items.length) return null

    const finalClassName = className ? `react-marquee-ticker ${className}` : 'react-marquee-ticker'

    return (
      <div
        ref={ref => {
          this._containerRef = ref
        }}
        className={finalClassName}
        style={style}
      >
        {this.renderSlot(prefix)}
        <div className="react-marquee-ticker-list-wrapper" style={{ height: itemHeight }}>
          {this.renderList()}
        </div>
        {this.renderSlot(suffix)}
      </div>
    )
  }
}

MarqueeTicker.defaultProps = {
  interval: 3000,
  speed: 400,
  autoMarquee: true,
  marqueeSpeed: 30,
  marqueeDelayBeforeScroll: 300,
  marqueeDelayAfterScroll: 0,
}
