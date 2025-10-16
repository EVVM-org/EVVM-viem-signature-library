/**
 * Staking Transaction Executor
 *
 * Functions to execute Staking transactions (golden, presale, public, service).
 * Each function calls the contract for a specific staking action using wagmi's writeContract.
 * Returns a Promise that resolves on success or rejects on error.
 * Input types match the contract ABI.
 */

import { writeContract } from '@wagmi/core';
import type { Config } from 'wagmi';
import {
  GoldenStakingInputData,
  PresaleStakingInputData,
  PublicServiceStakingInputData,
  PublicStakingInputData,
} from '../types';

// Default Staking ABI - minimal interface for staking functions
const STAKING_ABI = [
  {
    name: 'goldenStaking',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'isStaking', type: 'bool' },
      { name: 'amountOfStaking', type: 'uint256' },
      { name: 'signature_EVVM', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'presaleStaking',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'isStaking', type: 'bool' },
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
    name: 'publicStaking',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'isStaking', type: 'bool' },
      { name: 'amountOfStaking', type: 'uint256' },
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
    name: 'publicServiceStaking',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'service', type: 'address' },
      { name: 'isStaking', type: 'bool' },
      { name: 'amountOfStaking', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'signature', type: 'string' },
      { name: 'priorityFee_EVVM', type: 'uint256' },
      { name: 'nonce_EVVM', type: 'uint256' },
      { name: 'priorityFlag_EVVM', type: 'bool' },
      { name: 'signature_EVVM', type: 'string' },
    ],
    outputs: [],
  },
] as const;

export class StakingTransactionExecutor {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Execute golden staking transaction
   */
  async executeGoldenStaking(
    inputData: GoldenStakingInputData,
    stakingAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute golden staking");
    }

    return writeContract(this.config, {
      abi: STAKING_ABI,
      address: stakingAddress,
      functionName: "goldenStaking",
      args: [
        inputData.isStaking,
        inputData.amountOfStaking,
        inputData.signature_EVVM,
      ],
    });
  }

  /**
   * Execute presale staking transaction
   */
  async executePresaleStaking(
    inputData: PresaleStakingInputData,
    stakingAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute presale staking");
    }

    return writeContract(this.config, {
      abi: STAKING_ABI,
      address: stakingAddress,
      functionName: "presaleStaking",
      args: [
        inputData.user,
        inputData.isStaking,
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
   * Execute public staking transaction
   */
  async executePublicStaking(
    inputData: PublicStakingInputData,
    stakingAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute public staking");
    }

    return writeContract(this.config, {
      abi: STAKING_ABI,
      address: stakingAddress,
      functionName: "publicStaking",
      args: [
        inputData.user,
        inputData.isStaking,
        inputData.amountOfStaking,
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
   * Execute public service staking transaction
   */
  async executePublicServiceStaking(
    inputData: PublicServiceStakingInputData,
    stakingAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute public service staking");
    }

    return writeContract(this.config, {
      abi: STAKING_ABI,
      address: stakingAddress,
      functionName: "publicServiceStaking",
      args: [
        inputData.user,
        inputData.service,
        inputData.isStaking,
        inputData.amountOfStaking,
        inputData.nonce,
        inputData.signature,
        inputData.priorityFee_EVVM,
        inputData.nonce_EVVM,
        inputData.priorityFlag_EVVM,
        inputData.signature_EVVM,
      ],
    });
  }
}

// Standalone functions for backward compatibility
export const executeGoldenStaking = async (
  inputData: GoldenStakingInputData,
  stakingAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new StakingTransactionExecutor(config);
  return executor.executeGoldenStaking(inputData, stakingAddress);
};

export const executePresaleStaking = async (
  inputData: PresaleStakingInputData,
  stakingAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new StakingTransactionExecutor(config);
  return executor.executePresaleStaking(inputData, stakingAddress);
};

export const executePublicStaking = async (
  inputData: PublicStakingInputData,
  stakingAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new StakingTransactionExecutor(config);
  return executor.executePublicStaking(inputData, stakingAddress);
};

export const executePublicServiceStaking = async (
  inputData: PublicServiceStakingInputData,
  stakingAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new StakingTransactionExecutor(config);
  return executor.executePublicServiceStaking(inputData, stakingAddress);
};