import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { bsc } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://dashboard.reown.com
const projectId = '52730a62d9934dae769c91899275b45b'

// 2. Create a metadata object - optional
const metadata = {
  name: 'TENX Renaissance',
  description: 'TENX Renaissance Token Landing Page',
  url: 'https://www.tencoin.site', // Match the actual domain being used
  icons: ['https://tencoin.site/favicon.ico']
}

// 3. Set the networks
const networks = [bsc]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal with comprehensive analytics disabling
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false // Disable analytics to prevent blocked requests
  }
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

// Export the useAppKit hook
export { useAppKit } from '@reown/appkit/react'
export { wagmiAdapter }
