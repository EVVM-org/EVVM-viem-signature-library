// EVVM Smart Contract ABIs
import EstimatorABI from './Estimator.json';
import EvvmABI from './Evvm.json';
import NameServiceABI from './NameService.json';
import StakingABI from './Staking.json';

// Export the ABIs
export {
  EstimatorABI,
  EvvmABI,
  NameServiceABI,
  StakingABI
};

// Default export with all ABIs
export default {
  Estimator: EstimatorABI,
  Evvm: EvvmABI,
  NameService: NameServiceABI,
  Staking: StakingABI
};

// Individual ABI exports for convenience
export const EVVM_ABIS = {
  ESTIMATOR: EstimatorABI,
  EVVM: EvvmABI,
  NAME_SERVICE: NameServiceABI,
  STAKING: StakingABI
} as const;