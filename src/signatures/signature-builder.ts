import { Account, WalletClient } from "viem";

/**
 * Signature Builder
 * Base class for building and signing EVVM messages
 */
export class SignatureBuilder {
  constructor(
    protected walletClient: WalletClient,
    protected account: Account,
  ) {}

  /**
   * Signs a generic EIP-191 message.
   * @param message Message to sign
   * @returns Promise resolving to signature string
   */
  async signERC191Message(message: string): Promise<`0x${string}`> {
    return await this.walletClient.signMessage({
      account: this.account,
      message,
    });
  }
}
