import { ethers } from 'ethers';

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

const NETWORKS = [
  {
    name: 'Ethereum',
    rpc: 'https://ethereum.publicnode.com',
    contractAddress: '0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4',
    icon: '/imgs/networks/ethereum.png',
    id: 1,
    alternativeRpcs: [
      'https://rpc.ankr.com/eth',
      'https://cloudflare-eth.com'
    ]
  },
  {
    name: 'Binance Smart Chain',
    rpc: 'https://bsc-dataseed1.binance.org',
    contractAddress: '0x314593fa9a2fa16432913dbccc96104541d32d11',
    icon: '/imgs/networks/binance.png',
    id: 56,
    alternativeRpcs: [
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org'
    ]
  },
  {
    name: 'Polygon',
    rpc: 'https://polygon-rpc.com',
    contractAddress: '0x4d0def42cf57d6f27cd4983042a55dce1c9f853c',
    icon: '/imgs/networks/polygon.png',
    id: 137,
    alternativeRpcs: [
      'https://rpc-mainnet.matic.network',
      'https://rpc-mainnet.maticvigil.com'
    ]
  },
  {
    name: 'Base',
    rpc: 'https://mainnet.base.org',
    contractAddress: '0x946f8b0ef009f3f5b1b35e6511a82a58b09d8d4e',
    icon: '/imgs/networks/basenew.png',
    id: 8453,
    alternativeRpcs: [
      'https://base.publicnode.com',
      'https://base.meowrpc.com'
    ]
  },
  {
    name: 'Arbitrum',
    rpc: 'https://arb1.arbitrum.io/rpc',
    contractAddress: '0x9134283aFaF6E1B45689EC0b0c82fF2B232BCb30',
    icon: '/imgs/networks/arbitrum.png',
    id: 42161,
    alternativeRpcs: [
      'https://arbitrum.publicnode.com',
      'https://arbitrum-one.public.blastapi.io'
    ]
  }
];

export async function getKitPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=dexkit&vs_currencies=usd');
    const data = await response.json();
    return data.dexkit.usd;
  } catch (error) {
    console.error('Error fetching KIT price:', error);
    return 0;
  }
}

export interface TokenBalance {
  network: string;
  balance: string;
  formattedBalance: string;
  icon: string;
  usdValue: string;
  contractAddress: string;
  networkId: number;
  error?: string;
}

async function tryMultipleRpcs(network: typeof NETWORKS[0], walletAddress: string): Promise<{
  success: boolean;
  balance?: string;
  formattedBalance?: string;
  decimals?: number;
  error?: string;
}> {
  const rpcsToTry = [network.rpc, ...(network.alternativeRpcs || [])];
  
  for (const rpc of rpcsToTry) {
    try {
      const provider = new ethers.JsonRpcProvider(rpc);
      const contract = new ethers.Contract(network.contractAddress, ERC20_ABI, provider);
      
      const decimals = await contract.decimals();
      const balance = await contract.balanceOf(walletAddress);
      
      const formattedBalance = ethers.formatUnits(balance, decimals);
      
      return {
        success: true,
        balance: balance.toString(),
        formattedBalance,
        decimals
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error consulting ${network.name} using RPC ${rpc}: ${errorMessage}`);
    }
  }
  
  return {
    success: false,
    error: `Could not connect to any RPC for ${network.name}`
  };
}

export async function getKitBalances(walletAddress: string): Promise<TokenBalance[]> {
  const kitPrice = await getKitPrice();
  const balances: TokenBalance[] = [];

  for (const network of NETWORKS) {
    try {
      console.log(`Consulting balance in ${network.name}...`);
      
      const result = await tryMultipleRpcs(network, walletAddress);
      
      if (result.success && result.balance && result.formattedBalance) {
        const usdValue = parseFloat(result.formattedBalance) * kitPrice;
        
        balances.push({
          network: network.name,
          balance: result.balance,
          formattedBalance: result.formattedBalance,
          icon: network.icon,
          usdValue: usdValue.toFixed(2),
          contractAddress: network.contractAddress,
          networkId: network.id
        });
        
        console.log(`Balance in ${network.name}: ${result.formattedBalance} KIT`);
      } else {
        balances.push({
          network: network.name,
          balance: '0',
          formattedBalance: '0',
          icon: network.icon,
          usdValue: '0',
          contractAddress: network.contractAddress,
          networkId: network.id,
          error: result.error
        });
        
        console.log(`Could not get balance in ${network.name}: ${result.error}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`General error getting KIT balance in ${network.name}:`, errorMessage);
      
      balances.push({
        network: network.name,
        balance: '0',
        formattedBalance: '0',
        icon: network.icon,
        usdValue: '0',
        contractAddress: network.contractAddress,
        networkId: network.id,
        error: errorMessage
      });
    }
  }

  return balances;
}

export function getTotalUsdValue(balances: TokenBalance[]): string {
  const total = balances.reduce((acc, balance) => acc + parseFloat(balance.usdValue), 0);
  return total.toFixed(2);
} 