import React from 'react'
import ReactDom from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { Head } from './components/shared/Head.tsx'
import { PROJECT_NAME } from './constants/project.ts'
import './styles/index.css'

// biome-ignore lint/style/noNonNullAssertion: #root is exist in index.html
ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Head title={PROJECT_NAME} />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
