/*
  Build-time server renderer. scripts/prerender.mjs imports the SSR bundle of
  this file and calls render(path) once per route to write static HTML.

  This replaces the old headless-Chromium prerender. That approach depended on
  a browser launching inside Vercel's build image, and when it could not, the
  step skipped itself quietly and every page shipped as an empty shell to
  crawlers and AI agents. Rendering with React directly needs no browser, so
  there is nothing to fail silently.

  renderToPipeableStream + onAllReady waits for every React.lazy chunk (the
  quizzes and webinar pages) to resolve, so the output is the finished page,
  never the Suspense "Loading..." fallback.
*/
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { ToastProvider } from './components/Toast'

export function render(path) {
  const helmetContext = {}
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString()
        cb()
      },
    })
    sink.on('finish', () => resolve({ html, helmet: helmetContext.helmet }))

    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={path}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          pipe(sink)
        },
        onShellError: reject,
        onError(err) {
          reject(err)
        },
      },
    )
  })
}
