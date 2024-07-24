import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster as HotToaster } from 'react-hot-toast'

import { createRouter } from './router'
import { store } from './redux/store'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={createRouter()} />
        <ReactQueryDevtools />
        {/* <Toaster /> */}
        <HotToaster />
      </QueryClientProvider>
    </Provider>
  )
}
