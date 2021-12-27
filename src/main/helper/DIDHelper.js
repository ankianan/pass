export async function getDidDoc(did) {
    const longFormURI = await did.getURI();
    const response = await ION.resolve(longFormURI);
    return response;
}