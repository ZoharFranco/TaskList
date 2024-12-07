import crypto from 'crypto';

// Generate a key (for demonstration, you can use a secure method to store it)
const key = crypto.randomBytes(32); // 256-bit key (32 bytes)

// Encrypt function (AES-256-ECB without IV)
export const encrypt = (text: string): string => {
    const cipher = crypto.createCipheriv('aes-256-ecb', key, null); // No IV for ECB mode
    let encrypted = cipher.update(text, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

// Decrypt function (AES-256-ECB without IV)
export const decrypt = (encryptedData: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-ecb', key, null); // No IV for ECB mode
    let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
};
