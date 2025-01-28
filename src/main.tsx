import React from 'react'
import ReactDom from 'react-dom/client'
import { App } from './App.tsx'
import { setThemeWithoutRender } from './hooks/useTheme.ts'
import './styles/index.css'

const rootDom = document.getElementById('root')
if (rootDom === null) throw new Error('root element not found')

setThemeWithoutRender()

ReactDom.createRoot(rootDom).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
