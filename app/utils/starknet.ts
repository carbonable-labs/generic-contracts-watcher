import { num } from "starknet";

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

export function bigIntToNumber(value: bigint) {
    return parseFloat(value.toString());
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
