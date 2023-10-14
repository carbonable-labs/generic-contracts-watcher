export async function fetchAbi(provider: any, address: string) {
    const result = await provider.getClassAt(address);
    return result.abi;
}

export function bigIntToNumber(value: bigint) {
    return parseFloat(value.toString());
}

