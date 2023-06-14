import { Chain } from "@wagmi/core"

export const avalanche = {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche',
      symbol: 'AVAX',
    },
    rpcUrls: {
      public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
      default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
      etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 11_907_934,
      },
    },
  } as  Chain
  
  export const ganache = {
    id: 1337,
    name: 'Ganache',
    network: 'ganache',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['http://127.0.0.1:7545'] },
      default: { http: ['http://127.0.0.1:7545'] },
    },
    blockExplorers: {
      etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    // contracts: {
    //   multicall3: {
    //     address: '0xca11bde05977b3631167028862be2a173976ca11',
    //     blockCreated: 11_907_934,
    //   },
    // },
  } as  Chain

  export const hardhat = {
    id: 31337,
    name: 'Hardhat',
    network: 'Hardhat',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['http://127.0.0.1:8545'] },
      default: { http: ['http://127.0.0.1:8545'] },
    },
    blockExplorers: {
      etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    // contracts: {
    //   multicall3: {
    //     address: '0xca11bde05977b3631167028862be2a173976ca11',
    //     blockCreated: 11_907_934,
    //   },
    // },
  } as  Chain

  export const thetaTestnet = {
    id: 365,
    name: 'Theta Testnet',
    network: 'Theta',
    nativeCurrency: {
      decimals: 18,
      name: 'tFuel',
      symbol: 'tFuel',
    },
    rpcUrls: {
      public: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
      default: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
    },
    blockExplorers: {
      etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    // contracts: {
    //   multicall3: {
    //     address: '0xca11bde05977b3631167028862be2a173976ca11',
    //     blockCreated: 11_907_934,
    //   },
    // },
  } as  Chain


  export const okbTestChain = {
    id: 195,
    name: 'OKB Testnet',
    network: 'OKB',
    nativeCurrency: {
      decimals: 18,
      name: 'Okb',
      symbol: 'Okb',
    },
    rpcUrls: {
      public: { http: ['https://okbtestrpc.okbchain.org'] },
      default: { http: ['https://okbtestrpc.okbchain.org'] },
    },
    blockExplorers: {
      etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    // contracts: {
    //   multicall3: {
    //     address: '0xca11bde05977b3631167028862be2a173976ca11',
    //     blockCreated: 11_907_934,
    //   },
    // },
  } as  Chain