#!/usr/bin/env node

/**
 * 生成安全的 JWT Secret
 * 
 * 使用方法:
 *   node scripts/generate-jwt-secret.js
 * 
 * 或者直接在命令行:
 *   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

const crypto = require('crypto');

function generateJWTSecret(length = 32) {
  const secret = crypto.randomBytes(length).toString('hex');
  return secret;
}

function main() {
  console.log('\n🔐 生成安全的 JWT Secret\n');
  
  const secret = generateJWTSecret(32);
  
  console.log('你的 JWT Secret (64 个字符):');
  console.log('─'.repeat(70));
  console.log(secret);
  console.log('─'.repeat(70));
  
  console.log('\n📋 使用方法:');
  console.log('1. 复制上面的密钥');
  console.log('2. 打开 .env 文件');
  console.log('3. 设置 JWT_SECRET=<复制的密钥>');
  
  console.log('\n⚠️  重要提示:');
  console.log('- 不要在代码中硬编码这个密钥');
  console.log('- 不要提交 .env 文件到 Git');
  console.log('- 生产环境使用不同的密钥');
  console.log('- 定期更换密钥以提高安全性\n');
}

main();
