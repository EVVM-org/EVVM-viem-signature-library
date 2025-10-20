/**
 * NameService Signature Builder
 *
 * Utility class for building and signing NameService messages (offers, registration, metadata, etc).
 * Provides functions for each NameService action, using viem for EIP-191 signatures.
 * Includes dual-signature logic for priority fee payments.
 */

import type { Account, WalletClient } from 'viem';
import {
  buildMessageSignedForPay,
  buildMessageSignedForPreRegistrationUsername,
  buildMessageSignedForRegistrationUsername,
  buildMessageSignedForMakeOffer,
  buildMessageSignedForWithdrawOffer,
  buildMessageSignedForAcceptOffer,
  buildMessageSignedForRenewUsername,
  buildMessageSignedForAddCustomMetadata,
  buildMessageSignedForRemoveCustomMetadata,
  buildMessageSignedForFlushCustomMetadata,
  buildMessageSignedForFlushUsername,
  hashPreRegisteredUsername,
} from '../utils';

export interface DualSignatureResult {
  paySignature?: `0x${string}`;
  actionSignature: `0x${string}`;
}

export class NameServiceSignatureBuilder {
  private walletClient: WalletClient;
  private account: Account;

  constructor(walletClient: WalletClient, account: Account) {
    this.walletClient = walletClient;
    this.account = account;
  }

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

  /**
   * Signs a NameService username pre-registration message.
   * If priorityFee_EVVM > 0, also signs a payment message for the priority fee.
   */
  async signPreRegistrationUsername(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    username: string,
    clowNumber: bigint,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const hashPreReg = hashPreRegisteredUsername(username, clowNumber);
    const preRegistrationMessage = buildMessageSignedForPreRegistrationUsername(
      evvmID,
      hashPreReg,
      nonce
    );

    const actionSignature = await this.signERC191Message(preRegistrationMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`, // Native token
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService username registration message.
   */
  async signRegistrationUsername(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    username: string,
    clowNumber: bigint,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const registrationMessage = buildMessageSignedForRegistrationUsername(
      evvmID,
      username,
      clowNumber,
      nonce
    );

    const actionSignature = await this.signERC191Message(registrationMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService make offer message.
   */
  async signMakeOffer(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    username: string,
    expireDate: bigint,
    amount: bigint,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const makeOfferMessage = buildMessageSignedForMakeOffer(
      evvmID,
      username,
      expireDate,
      amount,
      nonce
    );

    const actionSignature = await this.signERC191Message(makeOfferMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService withdraw offer message.
   */
  async signWithdrawOffer(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    username: string,
    offerID: bigint,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const withdrawOfferMessage = buildMessageSignedForWithdrawOffer(
      evvmID,
      username,
      offerID,
      nonce
    );

    const actionSignature = await this.signERC191Message(withdrawOfferMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService accept offer message.
   */
  async signAcceptOffer(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    username: string,
    offerID: bigint,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const acceptOfferMessage = buildMessageSignedForAcceptOffer(
      evvmID,
      username,
      offerID,
      nonce
    );

    const actionSignature = await this.signERC191Message(acceptOfferMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService renew username message.
   */
  async signRenewUsername(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    username: string,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const renewUsernameMessage = buildMessageSignedForRenewUsername(
      evvmID,
      username,
      nonce
    );

    const actionSignature = await this.signERC191Message(renewUsernameMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService add custom metadata message.
   */
  async signAddCustomMetadata(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    identity: string,
    value: string,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const addCustomMetadataMessage = buildMessageSignedForAddCustomMetadata(
      evvmID,
      identity,
      value,
      nonce
    );

    const actionSignature = await this.signERC191Message(addCustomMetadataMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService remove custom metadata message.
   */
  async signRemoveCustomMetadata(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    identity: string,
    key: bigint,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const removeCustomMetadataMessage = buildMessageSignedForRemoveCustomMetadata(
      evvmID,
      identity,
      key,
      nonce
    );

    const actionSignature = await this.signERC191Message(removeCustomMetadataMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService flush custom metadata message.
   */
  async signFlushCustomMetadata(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    identity: string,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const flushCustomMetadataMessage = buildMessageSignedForFlushCustomMetadata(
      evvmID,
      identity,
      nonce
    );

    const actionSignature = await this.signERC191Message(flushCustomMetadataMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }

  /**
   * Signs a NameService flush username message.
   */
  async signFlushUsername(
    evvmID: bigint,
    addressNameService: `0x${string}`,
    username: string,
    nonce: bigint,
    priorityFee_EVVM: bigint = 0n,
    nonce_EVVM: bigint = 0n,
    priorityFlag_EVVM: boolean = false
  ): Promise<DualSignatureResult> {
    const flushUsernameMessage = buildMessageSignedForFlushUsername(
      evvmID,
      username,
      nonce
    );

    const actionSignature = await this.signERC191Message(flushUsernameMessage);

    let paySignature: `0x${string}` | undefined;
    if (priorityFee_EVVM > 0n) {
      const payMessage = buildMessageSignedForPay(
        evvmID,
        addressNameService,
        "0x0000000000000000000000000000000000000001" as `0x${string}`,
        priorityFee_EVVM,
        0n,
        nonce_EVVM,
        priorityFlag_EVVM,
        addressNameService
      );
      paySignature = await this.signERC191Message(payMessage);
    }

    return {
      paySignature,
      actionSignature,
    };
  }
}