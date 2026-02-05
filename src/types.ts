import type { ReactNode, ReactElement } from 'react'

export type MarqueTickerItemData =
  | {
      type: 'element'
      content: ReactElement
    }
  | {
      type: 'text'
      content: string | React.ReactNode
    }

export type SlotRender = ReactNode | (() => ReactNode)

export type Timer = ReturnType<typeof setTimeout> | null

export interface MarqueeTickerProps {
  // Data
  items?: Array<string | ReactElement>
  placeholder?: string

  // Layout
  itemHeight: string
  style?: React.CSSProperties
  className?: string
  singleLine?: boolean

  // Vertical scrolling
  interval?: number
  speed?: number
  paused?: boolean

  // Horizontal (overflow) scrolling
  autoMarquee?: boolean
  marqueeSpeed?: number
  marqueeDelayBeforeScroll?: number
  marqueeDelayAfterScroll?: number

  // Slots
  prefix?: SlotRender
  suffix?: SlotRender

  children?:
    | React.ReactElement<MarqueeTickerItemProps>
    | Array<React.ReactElement<MarqueeTickerItemProps>>
}

export interface MarqueeTickerItemProps {
  style?: React.CSSProperties
  className?: string
  children: ReactNode
}

export interface MarqueeMaskProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export interface MarqueeTextProps {
  children: React.ReactNode
  style?: React.CSSProperties
}
