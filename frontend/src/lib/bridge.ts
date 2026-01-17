import { createConfig, executeRoute, ChainId, getRoutes } from '@lifi/sdk';
import { Wallet, JsonRpcProvider, formatEther } from 'ethers';

// Initialize Li.Fi
createConfig({
  integrator: 'ramsay',
});

// Chain configs
const MAINNET_RPC = 'https://eth.llamarpc.com';
const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'; // Native ETH
const HYPERLIQUID_CHAIN_ID = 998; // HyperLiquid L1

export interface TransferStatus {
  step: 'checking' | 'approving' | 'bridging' | 'confirming' | 'complete' | 'error';
  message: string;
  txHash?: string;
}

export type StatusCallback = (status: TransferStatus) => void;

export async function getETHBalance(address: string): Promise<string> {
  const provider = new JsonRpcProvider(MAINNET_RPC);
  const balance = await provider.getBalance(address);
  return formatEther(balance);
}

export async function bridgeToHyperLiquid(
  wallet: Wallet,
  onStatus: StatusCallback
): Promise<string> {
  const provider = new JsonRpcProvider(MAINNET_RPC);

  onStatus({ step: 'checking', message: 'Checking balance...' });

  // Check ETH balance
  const balance = await provider.getBalance(wallet.address);

  if (balance === 0n) {
    onStatus({ step: 'error', message: 'No ETH balance found' });
    throw new Error('No ETH balance');
  }

  // Reserve some ETH for gas (0.005 ETH)
  const gasReserve = BigInt('5000000000000000');
  const amountToBridge = balance - gasReserve;

  if (amountToBridge <= 0n) {
    onStatus({ step: 'error', message: 'Balance too low to bridge (need gas)' });
    throw new Error('Insufficient balance for gas');
  }

  const balanceFormatted = parseFloat(formatEther(amountToBridge)).toFixed(4);
  onStatus({ step: 'checking', message: `Found ${balanceFormatted} ETH to bridge` });

  try {
    // Use Li.Fi to find best route to HyperLiquid
    onStatus({ step: 'bridging', message: 'Finding best route via Li.Fi...' });

    const routesResult = await getRoutes({
      fromChainId: ChainId.ETH,
      toChainId: HYPERLIQUID_CHAIN_ID,
      fromTokenAddress: ETH_ADDRESS,
      toTokenAddress: ETH_ADDRESS,
      fromAmount: amountToBridge.toString(),
      fromAddress: wallet.address,
      toAddress: wallet.address,
    });

    if (routesResult.routes && routesResult.routes.length > 0) {
      const route = routesResult.routes[0];
      onStatus({ step: 'bridging', message: 'Executing bridge via Li.Fi...' });

      const result = await executeRoute(route, {
        updateRouteHook: (updatedRoute) => {
          const step = updatedRoute.steps[0];
          if (step?.execution?.status === 'PENDING') {
            onStatus({
              step: 'bridging',
              message: `Bridging via ${step.toolDetails.name}...`,
              txHash: step.execution.process?.[0]?.txHash
            });
          }
        },
      });

      onStatus({
        step: 'complete',
        message: `Bridged ${balanceFormatted} ETH to HyperLiquid!`,
        txHash: result.steps[0]?.execution?.process?.[0]?.txHash
      });

      return result.steps[0]?.execution?.process?.[0]?.txHash || '';
    }

    // No routes found
    onStatus({ step: 'error', message: 'No bridge route available to HyperLiquid' });
    throw new Error('No bridge route found');

  } catch (lifiError) {
    console.error('Li.Fi bridge error:', lifiError);
    onStatus({
      step: 'error',
      message: lifiError instanceof Error ? lifiError.message : 'Bridge failed'
    });
    throw lifiError;
  }
}

export async function waitForDeposit(
  address: string,
  onStatus: StatusCallback,
  timeoutMs: number = 120000
): Promise<boolean> {
  const startTime = Date.now();
  const provider = new JsonRpcProvider(MAINNET_RPC);

  onStatus({ step: 'checking', message: 'Waiting for ETH deposit...' });

  while (Date.now() - startTime < timeoutMs) {
    const balance = await provider.getBalance(address);
    // Need at least 0.01 ETH to bridge (accounting for gas)
    if (balance > BigInt('10000000000000000')) {
      const balanceFormatted = parseFloat(formatEther(balance)).toFixed(4);
      onStatus({ step: 'checking', message: `Received ${balanceFormatted} ETH!` });
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    onStatus({ step: 'checking', message: `Waiting for deposit... (${elapsed}s)` });
  }

  onStatus({ step: 'error', message: 'Deposit timeout - check MoonPay status' });
  return false;
}
