import { AES, enc, format } from "crypto-js";

export const encode = (data: string): string => {
  var ciphertext = AES.encrypt(
    data,
    process.env.CRYPTO_KEY as string
  ).toString();

  const toHex = enc.Base64.parse(ciphertext).toString(enc.Hex);

  return toHex;
};

export const decode = (encodeData: string): string => {
  const toBase = enc.Hex.parse(encodeData).toString(enc.Base64);

  const a = AES.decrypt(toBase, process.env.CRYPTO_KEY as string);
  const originalText = a.toString(enc.Utf8);
  return originalText;
};
