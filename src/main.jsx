import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from './ErrorBoundary.jsx'

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function showFatal(message) {
  const safe = escapeHtml(message)
  document.body.innerHTML = `
    <div style="padding:24px;font-family:system-ui,sans-serif;background:#1a1a1a;color:#eee;min-height:100vh;box-sizing:border-box;">
      <h1 style="color:#c9a66b;">App failed to start</h1>
      <pre style="white-space:pre-wrap;word-break:break-word;background:#111;padding:16px;border-radius:8px;border:1px solid #333;">${safe}</pre>
      <p style="opacity:0.85;margin-top:16px;">Check the browser console (F12). On Vercel: Project → Root Directory must be the folder with <code>package.json</code> (usually <code>Ged_hotel</code>), and Output = <code>dist</code>.</p>
    </div>`
}

window.addEventListener('error', (e) => {
  console.error(e.error || e.message)
})

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled rejection:', e.reason)
})

const rootEl = document.getElementById('root')
if (!rootEl) {
  showFatal('Missing #root in index.html')
} else {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
  } catch (err) {
    showFatal(err?.message || err)
  }
}
