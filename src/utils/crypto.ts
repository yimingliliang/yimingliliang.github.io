import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key-2024'; // 你可以更改这个密钥

export const encrypt = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decrypt = (encryptedData: string): any => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}; 