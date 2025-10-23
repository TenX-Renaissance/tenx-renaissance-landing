import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, polygon, bsc } from 'wagmi/chains'

// Get projectId from https://cloud.reown.com
export const projectId = '52730a62d9934dae769c91899275b45b'

// Create a metadata object - this is optional
const metadata = {
  name: 'TENX Renaissance',
  description: 'TENX Renaissance Token',
  url: 'https://tencoin.site',
  icons: ['https://tencoin.site/favicon.ico']
}

// Create the modal with minimal configuration to avoid errors
export const appKit = createAppKit({
  projectId,
  chains: [bsc],
  defaultChain: bsc,
  metadata
})

export const wagmiConfig = appKit.wagmiConfig
