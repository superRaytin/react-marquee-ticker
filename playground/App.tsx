import React, { useEffect, useState } from 'react'
import MarqueeTicker from 'react-marquee-ticker'
import '../src/index.less'
import './app.less'

declare let window: any

const demoData = [
  'Short notice',
  'This is a very long notice that will scroll horizontally when overflowed',
  'Supports both modern React and legacy React 0.14.x without breaking changes.',
]

const demoData2 = [
  'Works out of the box — no CSS import required.',
  'Simple API, predictable behavior.',
  'Designed for dashboards, notices, and system messages.',
]

export default function App() {
  const [paused, setPaused] = useState<boolean | null>(null)
  
  useEffect(() => {
    prismInit()

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleVisibilityChange = () => {
    if (document.hidden) {
      console.log('paused')
      setPaused(true)
    } else {
      console.log('resume')
      setTimeout(() => setPaused(false), 500)
    }
  }

  const prismInit = () => {
    const codeEls = document.querySelectorAll('.code')
    codeEls.forEach((el) => {
      window.Prism.highlightElement(el);
    })
  }

  return (
    <div className='container'>
      <div className='block'>
        <div className='left'>
          <h1>Basic usage</h1>
          <div className='preview'>
            <MarqueeTicker
              itemHeight='30px'
              items={demoData}
            />
          </div>
        </div>
        <pre className="demo-code">
          <code className="code language-jsx">
            {
`<MarqueeTicker
  itemHeight='30px'
  items={[
    'Short notice',
    'This is a very long notice that will scroll horizontally when overflowed',
    'Supports both modern React and legacy React 0.14.x without breaking changes.',
  ]}
/>`
            }
          </code>
        </pre>
      </div>

      <div className='block'>
        <div className='left'>
          <div className='left'>
            <h1>Provide items via children</h1>
            <div className='preview'>
              <MarqueeTicker itemHeight='30px'>
                <MarqueeTicker.Item key={1}>
                  Short notice
                </MarqueeTicker.Item>
                <MarqueeTicker.Item key={2}>
                  This is a very long notice that will scroll horizontally when overflowed.
                </MarqueeTicker.Item>
                <MarqueeTicker.Item key={3}>
                  Supports both modern React and legacy React 0.14.x without breaking changes.
                </MarqueeTicker.Item>
              </MarqueeTicker>
            </div>
          </div>
        </div>
        <pre className="demo-code">
          <code className="code language-jsx">
            {
`<MarqueeTicker itemHeight='30px'>
  <MarqueeTicker.Item key={1}>
    Short notice
  </MarqueeTicker.Item>
  <MarqueeTicker.Item key={2}>
    This is a very long notice that will scroll horizontally when overflowed.
  </MarqueeTicker.Item>
  <MarqueeTicker.Item key={3}>
    Supports both modern React and legacy React 0.14.x without breaking changes.
  </MarqueeTicker.Item>
</MarqueeTicker>
`
            }
          </code>
        </pre>
      </div>

      <div className='block'>
        <div className='left'>
          <div className='left'>
            <h1>Disable horizontal marquee scrolling</h1>
            <div className='preview'>
              <MarqueeTicker itemHeight='60px' autoMarquee={false}>
                <MarqueeTicker.Item key={1}>
                  Lightweight React marquee component, zero runtime dependencies.
                </MarqueeTicker.Item>
                <MarqueeTicker.Item key={2}>
                  Vertical ticker with optional horizontal marquee for long content.
                      &nbsp;<a href="#">See Details</a>
                </MarqueeTicker.Item>
              </MarqueeTicker>
            </div>
          </div>
        </div>
        <pre className="demo-code">
          <code className="code language-jsx">
            {
`<MarqueeTicker itemHeight='60px' autoMarquee={false}>
  <MarqueeTicker.Item key={1}>
    Lightweight React marquee component, zero runtime dependencies.
  </MarqueeTicker.Item>
  <MarqueeTicker.Item key={2}>
    Vertical ticker with optional horizontal marquee for long content.
        &nbsp;<a href="#">See Details</a>
  </MarqueeTicker.Item>
</MarqueeTicker>
`
            }
          </code>
        </pre>
      </div>

      <div className='block'>
        <div className='left'>
          <h1>Using a Mask + Text structure</h1>
          <div className='preview'>
            <MarqueeTicker itemHeight='30px' autoMarquee={true}>
              <MarqueeTicker.Item key={1}>
                <MarqueeTicker.Mask>
                  <MarqueeTicker.Text>Short notice</MarqueeTicker.Text>
                </MarqueeTicker.Mask>
              </MarqueeTicker.Item>
              <MarqueeTicker.Item key={2}>
                <MarqueeTicker.Mask>
                  <MarqueeTicker.Text>
                    This is a very long notice that will scroll horizontally when overflowed.
                    &nbsp;<a href="#">See Details</a>
                  </MarqueeTicker.Text>
                </MarqueeTicker.Mask>
              </MarqueeTicker.Item>
            </MarqueeTicker>
          </div>
        </div>
        <pre className="demo-code">
          <code className="code language-jsx">
            {
`<MarqueeTicker itemHeight='30px' autoMarquee>
  <MarqueeTicker.Item key={1}>
    <MarqueeTicker.Mask>
      <MarqueeTicker.Text>Short notice</MarqueeTicker.Text>
    </MarqueeTicker.Mask>
  </MarqueeTicker.Item>
  <MarqueeTicker.Item key={2}>
    <MarqueeTicker.Mask>
      <MarqueeTicker.Text>
        This is a very long notice that will scroll horizontally when overflowed.
        &nbsp;<a href="#">See Details</a>
      </MarqueeTicker.Text>
    </MarqueeTicker.Mask>
  </MarqueeTicker.Item>
</MarqueeTicker>
`
            }
          </code>
        </pre>
      </div>

      <div className='block'>
        <div className='left'>
          <h1>Single-line mode with ellipsis</h1>
          <div className='preview'>
            <MarqueeTicker
              singleLine
              autoMarquee={false}
              itemHeight='30px'
              items={demoData}
            />
          </div>
        </div>
        <pre className="demo-code">
          <code className="code language-jsx">
            {
`<MarqueeTicker
  singleLine
  autoMarquee={false}
  itemHeight='30px'
  items={[
    'Short notice',
    'This is a very long notice that will scroll horizontally when overflowed',
    'Supports both modern React and legacy React 0.14.x without breaking changes.',
  ]}
/>`
            }
          </code>
        </pre>
      </div>

      <div className='block'>
        <div className='left'>
          <h1>Custom prefix / suffix</h1>
          <div className='preview'>
            <MarqueeTicker
              itemHeight='30px'
              items={demoData2}
              prefix={() => <span className="prefix">🔔</span>}
              suffix={() => <span className="suffix">NEW</span>}
            />
          </div>
        </div>
        <pre className="demo-code">
          <code className="code language-jsx">
            {
`<MarqueeTicker
  itemHeight='30px'
  items={[
    'Works out of the box — no CSS import required.',
    'Simple API, predictable behavior.',
    'Designed for dashboards, notices, and system messages.',
  ]}
  prefix={() => <span className="prefix">🔔</span>}
  suffix={() => <span className="suffix">NEW</span>}
/>
`
            }
          </code>
        </pre>
      </div>

      <div className='block'>
        <div className='left'>
          <h1>Pause / Unpause scrolling on page visibility change</h1>
          <div className='preview'>
            <MarqueeTicker
              itemHeight='30px'
              items={demoData}
              paused={!!paused}
            />
          </div>
          {paused !== null && (
            <div style={{
              marginTop: '10px',
              fontSize: '20px',
              color: paused ? 'red' : 'green',
              fontWeight: 'bold',
            }}>
              {paused ? 'PAUSED' : 'RESUME'}
            </div>
          )}
        </div>
        <pre className="demo-code">
          <code className="code language-jsx">
            {
`<MarqueeTicker
  itemHeight='30px'
  items={[
    'Short notice',
    'This is a very long notice that will scroll horizontally when overflowed',
    'Supports both modern React and legacy React 0.14.x without breaking changes.',
  ]}
  paused={paused}
/>

// Observe page visibility state
document.addEventListener('visibilitychange', () => {
  setPaused(document.hidden)
})
`
            }
          </code>
        </pre>
      </div>

    </div>
  )
}