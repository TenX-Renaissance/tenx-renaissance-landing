import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { bsc } from 'wagmi/chains'

// Get projectId from https://cloud.reown.com
export const projectId = '52730a62d9934dae769c91899275b45b'

// Create a metadata object
const metadata = {
  name: 'TENX Renaissance',
  description: 'TENX Renaissance Token',
  url: 'https://tencoin.site',
  icons: ['https://tencoin.site/favicon.ico']
}

// Create the modal with proper configuration
export const appKit = createAppKit({
  projectId,
  chains: [bsc],
  defaultChain: bsc,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook'],
    emailShowWallets: false
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-z-index': '1000'
  }
})

export const wagmiConfig = appKit.wagmiConfig
