export * from "./Chain";
import type { EnsPublicActions as ENS } from "@ensdomains/ensjs";

/* eslint-disable @typescript-eslint/no-unused-vars */
export type bytes32 = `0x${string}`;
export type AddressType = `0x${string}`;

type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

type PublicInterface<Type> = { [Key in keyof Type]: Type[Key] };
type PublicENS = PublicInterface<ENS>;

export type ReturnedENS = {
  [key in keyof PublicENS]: Awaited<ReturnType<PublicENS[key]>>;
};

export const emptyAddress =
  "0x0000000000000000000000000000000000000000" as AddressType;

export type depositEvent = {
  transactionHash: string;
  from: string;
  to: string;
  amount: string;
  isEth: number;
  extraData: string;
  remoteToken: string;
  localToken: string;
  blockNumber: number;
  addressContract: string;
  version: string;
};

export type withdrawalEvent = {
  l1Token: string;
  l2Token: string;
  from: string;
  to: string;
  amount: string;
  extraData: string;
  transactionHash: string;
  blockNumber: number;
  addressContract: string;
};
