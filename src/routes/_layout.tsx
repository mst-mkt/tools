import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Flex } from 'rizzui/flex'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export const Route = createFileRoute('/_layout')({
  component: () => <RootLayout />,
})

const RootLayout = () => (
  <Flex direction="col" align="stretch" gap="12" className="min-h-svh">
    <Header />
    <Flex
      as="main"
      direction="col"
      align="stretch"
      gap="8"
      className="mx-auto w-full max-w-max-content grow px-6"
    >
      <Outlet />
    </Flex>
    <Footer />
  </Flex>
)
