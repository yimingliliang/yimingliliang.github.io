const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.VITE_SECRET_KEY || 'your-secret-key-2024';

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// 读取原始数据
const sitesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/sites.json'), 'utf-8'));

// 加密数据
const encryptedData = encrypt(sitesData);

// 写入加密后的数据
fs.writeFileSync(
  path.join(__dirname, '../public/sites.encrypted.json'),
  encryptedData
); 