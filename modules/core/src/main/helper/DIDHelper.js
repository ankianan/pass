export async function getDidDoc(did) {
    const response = await ION.resolve(did);
    return response;
}