import fs from 'fs';
import path from 'path';
import { encrypt } from '../src/utils/crypto';

// 读取原始数据
const sitesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/sites.json'), 'utf-8'));

// 加密数据
const encryptedData = encrypt(sitesData);

// 写入加密后的数据
fs.writeFileSync(
  path.join(__dirname, '../public/sites.encrypted.json'),
  encryptedData
); 