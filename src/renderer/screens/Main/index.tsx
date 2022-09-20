import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import { Status, TabView } from 'renderer/components'
import { useWindowStore } from 'renderer/store'
import React from 'react'
const queryClient = new QueryClient()

export function MainScreen() {
  const { App } = window // The "App" comes from the bridge

  const navigate = useNavigate()
  const store = useWindowStore().about

  useEffect(() => {
    App.sayHelloFromBridge()

    App.whenAboutWindowClose(({ message }) => {
      console.log(message)

      store.setAboutWindowState(false)
    })
  }, [])

  function openAboutWindow() {
    App.createAboutWindow()
    store.setAboutWindowState(true)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <h1>DAISY Pipeline</h1>
        <Status />
      </header>
      <main>
        <TabView />
      </main>
    </QueryClientProvider>
  )
}