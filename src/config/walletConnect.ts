import { createAppKit } from '@reown/appkit/react'

// Get projectId from https://cloud.reown.com
export const projectId = '52730a62d9934dae769c91899275b45b'

// Create a metadata object
const metadata = {
  name: 'TENX Renaissance',
  description: 'TENX Renaissance Token',
  url: 'https://tencoin.site',
  icons: ['https://tencoin.site/favicon.ico']
}

// Define BSC chain manually to avoid import issues
const bsc = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed.binance.org'],
    },
    public: {
      http: ['https://bsc-dataseed.binance.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BSCScan',
      url: 'https://bscscan.com',
    },
  },
}

// Create the modal with minimal configuration to avoid errors
export const appKit = createAppKit({
  projectId,
  chains: [bsc],
  defaultChain: bsc,
  metadata
})

export const wagmiConfig = appKit.wagmiConfig
