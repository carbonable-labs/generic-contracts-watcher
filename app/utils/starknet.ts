import type { Uint256 } from "starknet";
import { num, shortString, uint256 } from "starknet";
import { contractRegex } from "~/types/config";

export async function fetchAbi(provider: any, address: string) {
  try {
      const result = await provider.getClassAt(address);
      return {abiResult: result.abi, isImplementationClass: false};
  } catch (e1) {
      try {
          const compiledEContract = await provider.getClassByHash(num.toHex(address));
          return {abiResult: compiledEContract.abi, isImplementationClass: true};
      } catch (e2) {
          console.error(e1);
          console.error(e2);
          return {abiResult: undefined, isImplementationClass: false};
      }
  }
}

export function uint256ToString(value: Uint256) {
    return uint256.uint256ToBN(value).toString();
}

export function bigIntToString(value: bigint) {
    return value.toString();
}

export function hasSupportsInterface(obj: any): boolean {
  if (typeof obj === 'string') {
    // Check if the current object is a string and contains "supports_interface"
    return obj.includes('supports_interface');
  } else if (Array.isArray(obj)) {
    // If it's an array, recursively check each element
    return obj.some((item) => hasSupportsInterface(item));
  } else if (typeof obj === 'object') {
    // If it's an object, recursively check each property's values
    return Object.values(obj).some((value) => hasSupportsInterface(value));
  }
  return false;
}

export function formatData(data: any, output: any) {
  const value = data.hasOwnProperty(output.name) ? data[output.name] : data;

  if (value === undefined) {
    return "undefined";
  }

  switch (output.type) {
    case "Uint256":
      return  uint256.uint256ToBN(value).toString();
    case "core::integer::u256":
      return num.isBigInt(value) ? value.toString() : uint256.uint256ToBN(value).toString() ;
    case "felt":
      if (typeof value === "object") {
        return JSON.stringify(value, null, 2);
      }
      if (contractRegex.test(num.toHex(value))) {
        return num.toHex(value);
      }
      if (num.isBigInt(value)) {
        return value.toString();
      }
      if (shortString.isShortString(num.toHex(value))) {
        return shortString.decodeShortString(num.toHex(value));
      }

      return "Not supported";
    case "core::felt252":
      if (contractRegex.test(num.toHex(value))) {
        return num.toHex(value);
      }

      return shortString.decodeShortString(num.toHex(value));
    default:
      return "Not supported";
  }
}
