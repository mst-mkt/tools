import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './lib/tanstack-router/routeTree.gen'

const router = createRouter({
  routeTree: routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return <RouterProvider router={router} />
}

// biome-ignore lint/style/noDefaultExport: this file is the entry point of the app, so it should be default export
export default App
