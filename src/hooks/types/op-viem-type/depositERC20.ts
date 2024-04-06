import { l1StandardBridgeABI } from "@abi/constant";
import type { Address, Hex } from "viem";

// TODO(Wilson): Consider moving these to actions/wallet/L1/types
export const ABI = l1StandardBridgeABI;
export const FUNCTION = "depositERC20To";

export type DepositERC20Parameters = {
  l1Token: Address;
  l2Token: Address;
  to: Address;
  amount: bigint;
  minGasLimit: number;
  extraData?: Hex;
};
