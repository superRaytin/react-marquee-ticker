import React, { useLayoutEffect, useRef, useCallback } from 'react'
import type { MarqueTickerItemData, SlotRender } from './types'
import Item from './components/Item'
import Mask from './components/Mask'
import Text from './components/Text'

export function normalizeItemsFromProps(
  items: Array<string | React.ReactNode>,
): MarqueTickerItemData[] {
  return items.map(item => ({
    type: 'text',
    content: item,
  }))
}

export function normalizeItemsFromChildren(children: React.ReactNode): MarqueTickerItemData[] {
  const items = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<{ children?: React.ReactNode }>[]

  return items.map((item, index) => {
    if (!isItem(item)) {
      warn(
        `Child at index ${index} is not <MarqueeTicker.Item />. autoMarquee may not work as expected.`,
      )
    }

    const itemChildren = React.Children.toArray(item.props.children)

    const mask = itemChildren.find(isMask)
    if (mask) {
      const maskChildren = React.Children.toArray(mask.props.children)
      const text = maskChildren.find(isText)

      if (!text) {
        warn(
          '<MarqueeTicker.Mask> does not contain <MarqueeTicker.Text />. autoMarquee may not work as expected.',
        )
      }
    }

    return {
      type: 'element',
      content: item,
    }
  })
}

/**
 * Type guards
 */
export function isItem(element: any): element is React.ReactElement<{ children: React.ReactNode }> {
  return React.isValidElement(element) && element.type === Item
}

export function isMask(element: any): element is React.ReactElement<{ children: React.ReactNode }> {
  return React.isValidElement(element) && element.type === Mask
}

export function isText(element: any): element is React.ReactElement<{ children: React.ReactNode }> {
  return React.isValidElement(element) && element.type === Text
}

function warn(message: string) {
  console.warn(`[react-marquee-ticker] ${message}`)
}

export function renderSlot(slot: SlotRender) {
  if (typeof slot === 'function') {
    return slot()
  }
  return slot
}

export function useEvent<T extends (...args: any[]) => any>(handler: T) {
  const handlerRef = useRef<T | null>(null)

  useLayoutEffect(() => {
    handlerRef.current = handler
  })

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    const fn = handlerRef.current
    return (fn as T)(...args)
  }, [])
}
