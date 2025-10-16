/**
 * NameService Transaction Executor
 * 
 * This module provides functions to execute NameService smart contract transactions using wagmi's writeContract.
 * Each function corresponds to a specific NameService action (registration, offer, metadata, etc).
 * All functions return a Promise that resolves on success or rejects on error.
 * 
 * Input types are imported from TypeInputStructures and match the contract ABI.
 */

import { writeContract } from '@wagmi/core';
import type { Config } from 'wagmi';
import {
  PreRegistrationUsernameInputData,
  RegistrationUsernameInputData,
  MakeOfferInputData,
  WithdrawOfferInputData,
  AcceptOfferInputData,
  RenewUsernameInputData,
  AddCustomMetadataInputData,
  RemoveCustomMetadataInputData,
  FlushCustomMetadataInputData,
  FlushUsernameInputData,
} from '../types';

// Default NameService ABI - minimal interface for name service functions
const NAMESERVICE_ABI = [
  {
    name: 'preRegistrationUsername',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'hashPreRegisteredUsername', type: 'string' },
      { name: 'nonce', type: 'uint256' },
      { name: 'signature', type: 'string' },
      { name: 'priorityFee_EVVM', type: 'uint256' },
      { name: 'nonce_EVVM', type: 'uint256' },
      { name: 'priorityFlag_EVVM', type: 'bool' },
      { name: 'signature_EVVM', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'registrationUsername',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'username', type: 'string' },
      { name: 'clowNumber', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'signature', type: 'string' },
      { name: 'priorityFee_EVVM', type: 'uint256' },
      { name: 'nonce_EVVM', type: 'uint256' },
      { name: 'priorityFlag_EVVM', type: 'bool' },
      { name: 'signature_EVVM', type: 'string' },
    ],
    outputs: [],
  },
  // Add other function definitions as needed...
] as const;

export class NameServiceTransactionExecutor {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Executes pre-registration of a username in NameService contract.
   */
  async executePreRegistrationUsername(
    inputData: PreRegistrationUsernameInputData,
    nameServiceAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute pre-registration");
    }

    return writeContract(this.config, {
      abi: NAMESERVICE_ABI,
      address: nameServiceAddress,
      functionName: "preRegistrationUsername",
      args: [
        inputData.user,
        inputData.hashPreRegisteredUsername,
        inputData.nonce,
        inputData.signature,
        inputData.priorityFee_EVVM,
        inputData.nonce_EVVM,
        inputData.priorityFlag_EVVM,
        inputData.signature_EVVM,
      ],
    });
  }

  /**
   * Executes registration of a username in NameService contract.
   */
  async executeRegistrationUsername(
    inputData: RegistrationUsernameInputData,
    nameServiceAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute registration");
    }

    return writeContract(this.config, {
      abi: NAMESERVICE_ABI,
      address: nameServiceAddress,
      functionName: "registrationUsername",
      args: [
        inputData.user,
        inputData.username,
        inputData.clowNumber,
        inputData.nonce,
        inputData.signature,
        inputData.priorityFee_EVVM,
        inputData.nonce_EVVM,
        inputData.priorityFlag_EVVM,
        inputData.signature_EVVM,
      ],
    });
  }

  // Additional methods for other NameService functions...
  // (makeOffer, withdrawOffer, acceptOffer, renewUsername, etc.)
}

// Standalone functions for backward compatibility
export const executePreRegistrationUsername = async (
  inputData: PreRegistrationUsernameInputData,
  nameServiceAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new NameServiceTransactionExecutor(config);
  return executor.executePreRegistrationUsername(inputData, nameServiceAddress);
};

export const executeRegistrationUsername = async (
  inputData: RegistrationUsernameInputData,
  nameServiceAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new NameServiceTransactionExecutor(config);
  return executor.executeRegistrationUsername(inputData, nameServiceAddress);
};