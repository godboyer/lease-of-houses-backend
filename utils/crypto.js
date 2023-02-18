const crypto = require('crypto')
const CryptoJS = require('crypto-js')
const key = crypto.randomBytes(16);
const iv = crypto.randomBytes(16);
const CryptoSecret = '__CryptoJS_Secret__';
console.log(key,iv)
/**
 * 
 * @param {string} key 密钥
 * @param {string} iv 初始向量,长度与key一致
 * @param {any} data data 要加密的明文数据，可以是一个Buffer或字符串
 * @returns 
 */
function encrypt (key,iv,data) {
    let decipher = crypto.createCipheriv('aes-128-cbc',key,iv)

    return decipher.update(data,'binary','base64')  + decipher.final('base64')
}

/**
 * 
 * @param {string} key key 必须是一个16字节长度的Buffer或字符串
 * @param {string} iv iv 必须是一个16字节长度的Buffer或字符串
 * @param {any} crypted 要解密的密文数据，必须是一个base64编码格式的字符串
 * @returns 
 */
function decrypt (key, iv, crypted) {
    crypted = new Buffer(crypted, 'base64').toString('binary');
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
}

/**
 * 加密数据
 * @param data - 数据
 */
function encrypto(data) {
    const newData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(newData, CryptoSecret).toString();
  }
  
  /**
   * 解密数据
   * @param cipherText - 密文
   */
  function decrypto(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (originalText) {
      return JSON.parse(originalText);
    }
    return null;
  }
  

module.exports  =  {
    encrypt,decrypt,encrypto,decrypto
}