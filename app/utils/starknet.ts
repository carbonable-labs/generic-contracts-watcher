export async function fetchAbi(provider: any, address: string) {
    const result = await provider.getClassAt(address);
    return result.abi;
}

