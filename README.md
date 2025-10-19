# @evvm/viem-signature-library

A comprehensive TypeScript library for interacting with the EVVM blockchain ecosystem, including payment processing, staking operations, and name service functionality.

## Features

- 🔐 **Signature Building** - Create EIP-191 signatures for EVVM, NameService, and Staking contracts
- 💸 **Payment Processing** - Handle single and multiple recipient payments with disperse functionality
- 🏦 **Staking Operations** - Support for golden, presale, public, and service staking
- 📝 **Name Service** - Username registration, offers, metadata management
- ⚡ **Transaction Execution** - Execute transactions via smart contracts using wagmi
- 🔧 **TypeScript Support** - Full type safety with comprehensive type definitions
- 🎯 **Modular Design** - Use only the components you need

## Installation

```bash
npm install @evvm/ts-library viem wagmi
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install viem@^2.0.0 wagmi@^2.0.0
```

## Quick Start

### Basic Payment Signature

```typescript
import { createWalletClient, http, privateKeyToAccount } from 'viem';
import { mainnet } from 'viem/chains';
import { EVVMSignatureBuilder } from '@evvm/ts-library';

// Setup wallet client
const account = privateKeyToAccount('0x...' as `0x${string}`);
const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});

// Create signature builder
const signatureBuilder = new EVVMSignatureBuilder(client, account);

// Sign a payment
const signature = await signatureBuilder.signPay(
  1n, // evvmID
  '0x742d35Cc6634C0532925a3b8D138068fd4C1B7a1', // to address
  '0x0000000000000000000000000000000000000000', // token (native)
  1000000000000000000n, // amount (1 ETH)
  50000000000000000n, // priority fee (0.05 ETH)
  1n, // nonce
  true, // priority flag
  '0x742d35Cc6634C0532925a3b8D138068fd4C1B7a1' // executor
);
```

### Execute Transaction

```typescript
import { createConfig } from 'wagmi';
import { EVVMTransactionExecutor, PayInputData } from '@evvm/ts-library';

const config = createConfig({
  // your wagmi config
});

const executor = new EVVMTransactionExecutor(config);

const paymentData: PayInputData = {
  from: '0x742d35Cc6634C0532925a3b8D138068fd4C1B7a1',
  to_address: '0x456...',
  to_identity: 'username.evvm',
  token: '0x0000000000000000000000000000000000000000',
  amount: 1000000000000000000n,
  priorityFee: 50000000000000000n,
  nonce: 1n,
  priority: true,
  executor: '0x742d35Cc6634C0532925a3b8D138068fd4C1B7a1',
  signature: signature,
};

const txHash = await executor.executePay(
  paymentData,
  '0xEVVMContractAddress' as `0x${string}`
);
```

## API Reference

### Signature Builders

#### EVVMSignatureBuilder

Handles EVVM payment signatures:

- `signPay()` - Single payment signature
- `signDispersePay()` - Multiple recipient payment signature
- `signERC191Message()` - Generic EIP-191 message signing

#### NameServiceSignatureBuilder

Handles name service operations:

- `signPreRegistrationUsername()` - Pre-register username
- `signRegistrationUsername()` - Register username
- `signMakeOffer()` - Make offer for username
- `signWithdrawOffer()` - Withdraw offer
- `signAcceptOffer()` - Accept offer
- `signRenewUsername()` - Renew username
- `signAddCustomMetadata()` - Add custom metadata
- `signRemoveCustomMetadata()` - Remove custom metadata
- `signFlushCustomMetadata()` - Flush all metadata
- `signFlushUsername()` - Flush username

#### StakingSignatureBuilder

Handles staking operations:

- `signGoldenStaking()` - Golden staking (single signature)
- `signPresaleStaking()` - Presale staking (dual signature)
- `signPublicStaking()` - Public staking (dual signature)
- `signPublicServiceStaking()` - Service staking (dual signature)

### Transaction Executors

#### EVVMTransactionExecutor

Execute EVVM transactions:

- `executePay()` - Execute single payment
- `executeDispersePay()` - Execute multiple recipient payment
- `executePayMultiple()` - Execute multiple payments in one call

#### NameServiceTransactionExecutor

Execute name service transactions:

- `executePreRegistrationUsername()`
- `executeRegistrationUsername()`
- And more...

#### StakingTransactionExecutor

Execute staking transactions:

- `executeGoldenStaking()`
- `executePresaleStaking()`
- `executePublicStaking()`
- `executePublicServiceStaking()`

### Utility Functions

#### Hash Tools

- `hashDispersePaymentUsersToPay()` - Hash payment data for multiple recipients
- `hashPreRegisteredUsername()` - Hash username with clown number

#### Message Construction

- `buildMessageSignedForPay()` - Build payment message
- `buildMessageSignedForDispersePay()` - Build disperse payment message
- `buildMessageSignedForPublicStaking()` - Build staking message
- And many more message builders for different contract functions...

### Type Definitions

The library provides comprehensive TypeScript types:

- `PayInputData` - Single payment data structure
- `DispersePayInputData` - Multiple payment data structure
- `DispersePayMetadata` - Individual recipient data
- `GoldenStakingInputData` - Golden staking data
- `PresaleStakingInputData` - Presale staking data
- `PublicStakingInputData` - Public staking data
- `PublicServiceStakingInputData` - Service staking data
- Name service types: `PreRegistrationUsernameInputData`, `RegistrationUsernameInputData`, etc.

## Examples

### Disperse Payment

```typescript
import { DispersePayMetadata } from '@evvm/ts-library';

const recipients: DispersePayMetadata[] = [
  {
    amount: 500000000000000000n, // 0.5 ETH
    to_address: '0x123...',
    to_identity: 'alice.evvm'
  },
  {
    amount: 500000000000000000n, // 0.5 ETH
    to_address: '0x456...',
    to_identity: 'bob.evvm'
  }
];

const signature = await signatureBuilder.signDispersePay(
  1n, // evvmID
  recipients,
  '0x0000000000000000000000000000000000000000', // native token
  1000000000000000000n, // total amount (1 ETH)
  50000000000000000n, // priority fee
  1n, // nonce
  true, // priority flag
  executor
);
```

### Name Service Registration

```typescript
const { paySignature, actionSignature } = await nameServiceBuilder.signRegistrationUsername(
  1n, // evvmID
  '0xNameServiceAddress' as `0x${string}`,
  'myusername', // username
  12345n, // clown number
  1n, // nonce
  100000000000000000n, // priority fee (0.1 ETH)
  2n, // EVVM nonce
  true // priority flag
);
```

### Staking Operations

```typescript
// Golden staking (single signature)
const goldenSignature = await stakingBuilder.signGoldenStaking(
  1n, // evvmID
  '0xStakingAddress' as `0x${string}`,
  5083000000000000000000n, // 5083 EVVM
  1n, // nonce
  true // priority flag
);

// Public staking (dual signature)
const { paySignature, stakingSignature } = await stakingBuilder.signPublicStaking(
  1n, // evvmID
  '0xStakingAddress' as `0x${string}`,
  true, // is staking
  1000000000000000000n, // staking amount
  1n, // staking nonce
  1000000000000000000n, // total price
  50000000000000000n, // priority fee
  2n, // EVVM nonce
  true // priority flag
);
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
npm run test:watch
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run typecheck
```

## Project Structure

```
src/
├── types/           # TypeScript type definitions
│   ├── evvm.ts     # EVVM payment types
│   ├── nameService.ts # Name service types
│   ├── staking.ts  # Staking types
│   └── index.ts    # Type exports
├── utils/          # Utility functions
│   ├── hashTools.ts # Hashing utilities
│   ├── constructMessage.ts # Message builders
│   └── index.ts    # Utility exports
├── signatures/     # Signature building classes
│   ├── evvm.ts     # EVVM signature builder
│   ├── nameService.ts # Name service signature builder
│   ├── staking.ts  # Staking signature builder
│   └── index.ts    # Signature exports
├── executors/      # Transaction execution classes
│   ├── evvm.ts     # EVVM transaction executor
│   ├── nameService.ts # Name service transaction executor
│   ├── staking.ts  # Staking transaction executor
│   └── index.ts    # Executor exports
└── index.ts        # Main library export
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@evvm.org
- 💬 Discord: [EVVM Community](https://discord.gg/evvm)
- 📖 Documentation: [docs.evvm.org](https://docs.evvm.org)
- 🐛 Issues: [GitHub Issues](https://github.com/EVVM-org/EVVM_ts_library/issues)

## Changelog

### v1.0.0

- Initial release with complete EVVM ecosystem support
- Signature building for payments, staking, and name service
- Transaction execution utilities
- Comprehensive TypeScript support
- Full test coverage and documentation