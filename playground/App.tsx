import React, { useEffect } from 'react'
import MarqueeTicker from 'react-marquee-ticker'
import '../src/index.less'
import './app.less'

declare let window: any

const demoData = [
  'Short notice',
  'This is a very long notice that will scroll horizontally when overflowed',
]

export default function App() {
  useEffect(() => {
    prismInit()
  }, [])

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
  ]}
/>`
            }
          </code>
        </pre>
      </div>

      <div className='block'>
        <div className='left'>
          <div className='left'>
            <h1>Provide items by children</h1>
            <div className='preview'>
              <MarqueeTicker itemHeight='60px' autoMarquee={false}>
                <MarqueeTicker.Item key={1}>
                  Short notice
                </MarqueeTicker.Item>
                <MarqueeTicker.Item key={2}>
                  This is a very long notice that will scroll horizontally when overflowed.
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
    Short notice
  </MarqueeTicker.Item>
  <MarqueeTicker.Item key={2}>
    This is a very long notice that will scroll horizontally when overflowed.
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
          <h1>Provide items by children 2</h1>
          <div className='preview'>
            <MarqueeTicker itemHeight='60px' autoMarquee={true}>
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
`<MarqueeTicker itemHeight='60px' autoMarquee>
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
          <h1>Single line</h1>
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
              items={demoData}
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
    'Short notice',
    'This is a very long notice that will scroll horizontally when overflowed',
  ]}
  prefix={() => <span className="prefix">🔔</span>}
  suffix={() => <span className="suffix">NEW</span>}
/>
`
            }
          </code>
        </pre>
      </div>
    </div>
  )
}