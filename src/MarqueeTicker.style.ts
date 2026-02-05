const MARQUEE_TICKER_CSS_TEXT = `{{MARQUEE_TICKER_CSS_TEXT}}`

const MARQUEE_TICKER_STYLE_ID = 'react-marquee-ticker-style'

if (typeof document !== 'undefined' && !document.getElementById(MARQUEE_TICKER_STYLE_ID)) {
  const style = document.createElement('style')
  style.id = MARQUEE_TICKER_STYLE_ID
  style.textContent = MARQUEE_TICKER_CSS_TEXT
  document.head.appendChild(style)
}
