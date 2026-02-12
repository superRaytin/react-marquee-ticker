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

  // Layout
  itemHeight: string
  style?: React.CSSProperties
  className?: string
  singleLine?: boolean

  // Vertical scrolling
  interval?: number
  speed?: number
  paused?: boolean

  // Horizontal scrolling (overflow)
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
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
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
