/**
 * EVVM Transaction Executor
 *
 * Functions to execute EVVM payment and disperse payment transactions via smart contract.
 * Each function calls the contract for a specific EVVM action using wagmi's writeContract.
 * Returns a Promise that resolves on success or rejects on error.
 * Input types match the contract ABI.
 */

import { writeContract } from '@wagmi/core';
import type { Config } from 'wagmi';
import { DispersePayInputData, PayInputData } from '../types';

// Default EVVM ABI - minimal interface for pay functions
const EVVM_ABI = [
  {
    name: 'pay',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to_address', type: 'address' },
      { name: 'to_identity', type: 'string' },
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'priorityFee', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'priority', type: 'bool' },
      { name: 'executor', type: 'string' },
      { name: 'signature', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'dispersePay',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'toData', type: 'tuple[]', components: [
        { name: 'amount', type: 'uint256' },
        { name: 'to_address', type: 'address' },
        { name: 'to_identity', type: 'string' }
      ]},
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'priorityFee', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'priority', type: 'bool' },
      { name: 'executor', type: 'string' },
      { name: 'signature', type: 'string' },
    ],
    outputs: [],
  },
  {
    name: 'payMultiple',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'payData', type: 'tuple[]', components: [
        { name: 'from', type: 'address' },
        { name: 'to_address', type: 'address' },
        { name: 'to_identity', type: 'string' },
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'priorityFee', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'executor', type: 'string' },
        { name: 'signature', type: 'string' },
      ]},
    ],
    outputs: [],
  },
] as const;

export class EVVMTransactionExecutor {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Execute a single payment transaction
   */
  async executePay(
    inputData: PayInputData,
    evvmAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute payment");
    }

    return writeContract(this.config, {
      abi: EVVM_ABI,
      address: evvmAddress,
      functionName: "pay",
      args: [
        inputData.from,
        inputData.to_address,
        inputData.to_identity,
        inputData.token,
        inputData.amount,
        inputData.priorityFee,
        inputData.nonce,
        inputData.priority,
        inputData.executor,
        inputData.signature,
      ],
    });
  }

  /**
   * Execute a disperse payment transaction (multiple recipients)
   */
  async executeDispersePay(
    inputData: DispersePayInputData,
    evvmAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData) {
      throw new Error("No data to execute payment");
    }

    return writeContract(this.config, {
      abi: EVVM_ABI,
      address: evvmAddress,
      functionName: "dispersePay",
      args: [
        inputData.from,
        inputData.toData,
        inputData.token,
        inputData.amount,
        inputData.priorityFee,
        inputData.nonce,
        inputData.priority,
        inputData.executor,
        inputData.signature,
      ],
    });
  }

  /**
   * Execute multiple payment transactions in a single call
   */
  async executePayMultiple(
    inputData: PayInputData[],
    evvmAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    if (!inputData || inputData.length === 0) {
      throw new Error("No data to execute multiple payments");
    }

    const formattedData = inputData.map((data) => ({
      from: data.from,
      to_address: data.to_address,
      to_identity: data.to_identity,
      token: data.token,
      amount: data.amount,
      priorityFee: data.priorityFee,
      nonce: data.nonce,
      executor: data.executor,
      signature: data.signature,
    }));

    return writeContract(this.config, {
      abi: EVVM_ABI,
      address: evvmAddress,
      functionName: "payMultiple",
      args: [formattedData],
    });
  }
}

// Standalone functions for backward compatibility
export const executePay = async (
  inputData: PayInputData,
  evvmAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new EVVMTransactionExecutor(config);
  return executor.executePay(inputData, evvmAddress);
};

export const executeDispersePay = async (
  inputData: DispersePayInputData,
  evvmAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new EVVMTransactionExecutor(config);
  return executor.executeDispersePay(inputData, evvmAddress);
};

export const executePayMultiple = async (
  inputData: PayInputData[],
  evvmAddress: `0x${string}`,
  config: Config
): Promise<`0x${string}`> => {
  const executor = new EVVMTransactionExecutor(config);
  return executor.executePayMultiple(inputData, evvmAddress);
};