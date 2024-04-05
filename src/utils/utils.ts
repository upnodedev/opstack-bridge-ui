import { toUtf8Bytes } from "ethers";
import { DecodedFuses } from "@ensdomains/ensjs/utils";

export const shortenAddress = (
  address = "",
  maxLength = 10,
  leftSlice = 5,
  rightSlice = 5,
) => {
  if (address.length < maxLength) {
    return address;
  }

  return `${address.slice(0, leftSlice)}...${address.slice(-rightSlice)}`;
};

export const secondsToDays = (seconds: number) =>
  Math.floor(seconds / (60 * 60 * 24));

export const secondsToHours = (seconds: number) =>
  Math.floor(seconds / (60 * 60));

export const daysToSeconds = (days: number) => days * 60 * 60 * 24;

export const yearsToSeconds = (years: number) => years * 60 * 60 * 24 * 365;

export const secondsToYears = (seconds: number) =>
  seconds / (60 * 60 * 24 * 365);

export const formatExpiry = (expiry: Date) =>
  `${expiry.toLocaleDateString(undefined, {
    month: "long",
  })} ${expiry.getDate()}, ${expiry.getFullYear()}`;

export const formatDateTime = (date: Date) => {
  const baseFormatted = date.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZoneName: "short",
  });
  return `${baseFormatted}`;
};

export const formatFullExpiry = (expiryDate?: Date) =>
  expiryDate
    ? `${formatExpiry(expiryDate)}, ${formatDateTime(expiryDate)}`
    : "";

export const makeEtherscanLink = (
  data: string,
  network?: string,
  route: string = "tx",
) =>
  `https://${
    !network || network === "mainnet" ? "" : `${network}.`
  }etherscan.io/${route}/${data}`;

export const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export const checkDNSName = (name: string): boolean => {
  const labels = name?.split(".");

  return !!labels && labels[labels.length - 1] !== "eth";
};

export const checkETH2LDFromName = (name: string) => {
  const labels = name.split(".");
  if (labels.length !== 2) return false;
  if (labels[1] !== "eth") return false;
  return true;
};

export const checkDNS2LDFromName = (name: string) => {
  const labels = name.split(".");
  if (labels.length !== 2) return false;
  if (labels[1] === "eth") return false;
  return true;
};

export const checkSubname = (name: string) => name.split(".").length > 2;

export const isLabelTooLong = (label: string) => {
  const bytes = toUtf8Bytes(label);
  return bytes.byteLength > 255;
};

export const getTestId = (props: any, fallback: string): string => {
  return props["data-testid"] ? String(props["data-testid"]) : fallback;
};

export const deleteProperty = <
  T extends Record<string, any>,
  K extends keyof T,
>(
  key: K,
  { [key]: _, ...newObj }: T,
): Omit<T, K> => newObj;

export const deleteProperties = <
  T extends Record<string, any>,
  K extends keyof T,
>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  const newObj = { ...obj };
  for (const key of keys) {
    delete newObj[key];
  }
  return newObj;
};

export const getLabelFromName = (name: string = "") => name.split(".")[0];

export const validateExpiry = (
  name: string,
  fuses: DecodedFuses | undefined,
  expiry: Date | undefined,
  pccExpired?: boolean,
) => {
  const isDotETH = checkETH2LDFromName(name);
  if (isDotETH) return expiry;
  if (!fuses) return undefined;
  return pccExpired || fuses.parent.PARENT_CANNOT_CONTROL ? expiry : undefined;
};

export const hexToNumber = (hex: string) => parseInt(hex, 16);

export const formatNumberStringComma = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
