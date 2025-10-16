/**
 * constructMessage
 *
 * Utility functions to construct message strings for EVVM, NameService, and Staking signatures.
 * Each function builds a formatted message for a specific contract action, encoding all required parameters.
 * Used for signing and verifying transactions.
 */

/**
 * Constructs a message for depositing funds in EVVM Fisher.
 * @param isERC20 Whether the token is an ERC20 token or native currency
 * @param receiverAddress Address that will receive the deposit
 * @param nonce Unique number to prevent replay attacks
 * @param tokenAddress Address of the token contract (only for ERC20)
 * @param priorityFee Fee amount for transaction priority
 * @param amount Amount of tokens/currency to deposit
 * @returns Formatted message string for Fisher deposit
 */
export function constructMessageForDepositFisher(
  isERC20: boolean,
  receiverAddress: string,
  nonce: bigint,
  tokenAddress: string,
  priorityFee: string,
  amount: string
): string {
  return `d7b0fe9e,${isERC20},${receiverAddress.toLowerCase()},${nonce},${tokenAddress.toLowerCase()},${priorityFee},${amount}`;
}

/*
┏━━━━━━━━━━━━━━━━┓
 EVVM Signatures  
┗━━━━━━━━━━━━━━━━┛
*/

/**
 * Construct a message for payMateStaking_async/sync or payNoMateStaking_async/sync in EVVM
 * @param evvmID EVVM chain ID
 * @param to address of the receiver
 * @param tokenAddress address of the token
 * @param amount amount of the token
 * @param priorityFee priority fee of the transaction
 * @param nonce nonce of the transaction
 * @param priorityFlag priority of the transaction
 * @param executor executor of the transaction
 * @returns message for payMateStaking_async/sync or payNoMateStaking_async/sync
 */
export function buildMessageSignedForPay(
  evvmID: bigint,
  to: `0x${string}` | string,
  tokenAddress: `0x${string}`,
  amount: bigint,
  priorityFee: bigint,
  nonce: bigint,
  priorityFlag: boolean,
  executor: `0x${string}`
): string {
  return `ef83c1d6,${evvmID},${to.toLowerCase()},${tokenAddress.toLowerCase()},${amount},${priorityFee},${nonce},${priorityFlag},${executor.toLowerCase()}`;
}

/**
 * Builds a formatted message string for dispersed payment signing.
 *
 * This function constructs a message by concatenating a fixed prefix with various
 * payment parameters, separated by commas. Token and executor addresses are
 * normalized to lowercase for consistency.
 *
 * @param evvmID EVVM chain ID
 * @param hashList The fixed hashed encoded data used as a base for the message
 * @param tokenAddress The token contract address (will be converted to lowercase)
 * @param amount The payment amount
 * @param priorityFee The priority fee amount
 * @param nonce The transaction nonce value
 * @param priorityFlag Boolean flag indicating if priority has been converted
 * @param executor The executor address (will be converted to lowercase)
 *
 * @returns A formatted string starting with 'ef83c1d6' followed by comma-separated parameters
 */
export function buildMessageSignedForDispersePay(
  evvmID: bigint,
  hashList: string,
  tokenAddress: `0x${string}`,
  amount: bigint,
  priorityFee: bigint,
  nonce: bigint,
  priorityFlag: boolean,
  executor: `0x${string}`
): string {
  return `ef83c1d6,${evvmID},${hashList},${tokenAddress.toLowerCase()},${amount},${priorityFee},${nonce},${priorityFlag},${executor.toLowerCase()}`;
}

/*
┏━━━━━━━━━━━━━━━━━━━┓
 staking Signatures   
┗━━━━━━━━━━━━━━━━━━━┛
*/

export function buildMessageSignedForPublicStaking(
  evvmID: bigint,
  isStaking: boolean,
  amountOfSMate: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${isStaking},${amountOfSMate},${nonce}`;
}

export function buildMessageSignedForPresaleStaking(
  evvmID: bigint,
  isStaking: boolean,
  amountOfSMate: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${isStaking},${amountOfSMate},${nonce}`;
}

export function buildMessageSignedForPublicServiceStake(
  evvmID: bigint,
  serviceAddress: string,
  isStaking: boolean,
  amountOfSMate: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${serviceAddress.toLowerCase()},${isStaking},${amountOfSMate},${nonce}`;
}

/*
┏━━━━━━━━━━━━━━━━━━━━━━━━┓
 Name service Signatures  
┗━━━━━━━━━━━━━━━━━━━━━━━━┛
*/

export function buildMessageSignedForPreRegistrationUsername(
  evvmID: bigint,
  hashPreRegisteredUsername: string,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${hashPreRegisteredUsername},${nonce}`;
}

export function buildMessageSignedForRegistrationUsername(
  evvmID: bigint,
  username: string,
  clowNumber: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${username},${clowNumber},${nonce}`;
}

export function buildMessageSignedForMakeOffer(
  evvmID: bigint,
  username: string,
  expireDate: bigint,
  amount: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${username},${expireDate},${amount},${nonce}`;
}

export function buildMessageSignedForWithdrawOffer(
  evvmID: bigint,
  username: string,
  offerID: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${username},${offerID},${nonce}`;
}

export function buildMessageSignedForAcceptOffer(
  evvmID: bigint,
  username: string,
  offerID: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${username},${offerID},${nonce}`;
}

export function buildMessageSignedForRenewUsername(
  evvmID: bigint,
  username: string,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${username},${nonce}`;
}

export function buildMessageSignedForAddCustomMetadata(
  evvmID: bigint,
  identity: string,
  value: string,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${identity},${value},${nonce}`;
}

export function buildMessageSignedForRemoveCustomMetadata(
  evvmID: bigint,
  identity: string,
  key: bigint,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${identity},${key},${nonce}`;
}

export function buildMessageSignedForFlushCustomMetadata(
  evvmID: bigint,
  identity: string,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${identity},${nonce}`;
}

export function buildMessageSignedForFlushUsername(
  evvmID: bigint,
  username: string,
  nonce: bigint
): string {
  return `e91b3f94,${evvmID},${username},${nonce}`;
}