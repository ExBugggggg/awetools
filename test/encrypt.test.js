import { expect, test } from 'vitest'
import {
    EncryptMD5,
    EncryptSHA1,
    EncryptSHA224,
    EncryptSHA256,
    EncryptSHA384,
    EncryptSHA512,
    EncryptHmacMD5,
    EncryptHmacSHA1,
    EncryptHmacSHA224,
    EncryptHmacSHA256,
    EncryptHmacSHA384,
    EncryptHmacSHA512,
    EncryptSHA3,
    EncryptHmacSHA3,
    // EncryptAES,
    // DecryptAES,
    // EncryptTripleDES,
    // DecryptTripleDES,
    // EncryptRabbit,
    // DecryptRabbit,
    // EncryptRC4,
    // DecryptRC4,
    EncryptKeccak,
    ConvertToBase64,
    ConvertToHex
} from '@assets/encrypt'

test('MD5 & HmacMD5 Test', () => {
    expect(EncryptMD5('').toString()).toBe('d41d8cd98f00b204e9800998ecf8427e')
    expect(EncryptMD5('test').toString()).toBe('098f6bcd4621d373cade4e832627b4f6')
    expect(EncryptHmacMD5('', '').toString()).toBe('74e6f7298a9c2d168935f58c001bad88')
    expect(EncryptHmacMD5('test', 'test').toString()).toBe('cd4b0dcbe0f4538b979fb73664f51abe')
})

test('SHA1 & HmacSHA1 Test', () => {
    expect(EncryptSHA1('').toString()).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709')
    expect(EncryptSHA1('test').toString()).toBe('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3')
    expect(EncryptHmacSHA1('', '').toString()).toBe('fbdb1d1b18aa6c08324b7d64b71fb76370690e1d')
    expect(EncryptHmacSHA1('test', 'test').toString()).toBe('0c94515c15e5095b8a87a50ba0df3bf38ed05fe6')
})

test('SHA224 & HmacSHA224 Test', () => {
    expect(EncryptSHA224('').toString()).toBe('d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f')
    expect(EncryptSHA224('test').toString()).toBe('90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809')
    expect(EncryptHmacSHA224('', '').toString()).toBe('5ce14f72894662213e2748d2a6ba234b74263910cedde2f5a9271524')
    expect(EncryptHmacSHA224('test', 'test').toString()).toBe('dd363131d32480dfa3f2e4661bd6c57238db70b45503f67c239195e8')
})

test('SHA256 & HmacSHA256 Test', () => {
    expect(EncryptSHA256('').toString()).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
    expect(EncryptSHA256('test').toString()).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')
    expect(EncryptHmacSHA256('', '').toString()).toBe('b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad')
    expect(EncryptHmacSHA256('test', 'test').toString()).toBe('88cd2108b5347d973cf39cdf9053d7dd42704876d8c9a9bd8e2d168259d3ddf7')
})

test('SHA384 & HmacSHA384 Test', () => {
    expect(EncryptSHA384('').toString()).toBe('38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b')
    expect(EncryptSHA384('test').toString()).toBe('768412320f7b0aa5812fce428dc4706b3cae50e02a64caa16a782249bfe8efc4b7ef1ccb126255d196047dfedf17a0a9')
    expect(EncryptHmacSHA384('', '').toString()).toBe('6c1f2ee938fad2e24bd91298474382ca218c75db3d83e114b3d4367776d14d3551289e75e8209cd4b792302840234adc')
    expect(EncryptHmacSHA384('test', 'test').toString()).toBe('e87c86331f55fadeeb670d69319acce0e943e051702d43ff9d3b05a95152388be4d2601631109567a502ab8da066f869')
})

test('SHA512 & HmacSHA512 Test', () => {
    expect(EncryptSHA512('').toString()).toBe('cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e')
    expect(EncryptSHA512('test').toString()).toBe('ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff')
    expect(EncryptHmacSHA512('', '').toString()).toBe('b936cee86c9f87aa5d3c6f2e84cb5a4239a5fe50480a6ec66b70ab5b1f4ac6730c6c515421b327ec1d69402e53dfb49ad7381eb067b338fd7b0cb22247225d47')
    expect(EncryptHmacSHA512('test', 'test').toString()).toBe('9ba1f63365a6caf66e46348f43cdef956015bea997adeb06e69007ee3ff517df10fc5eb860da3d43b82c2a040c931119d2dfc6d08e253742293a868cc2d82015')
})

test('SHA3 & HmacSHA3 Test', () => {
    expect(EncryptSHA3('', 224).toString()).toBe('6b4e03423667dbb73b6e15454f0eb1abd4597f9a1b078e3f5b5a6bc7')
    expect(EncryptSHA3('test', 256).toString()).toBe('36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80')
    expect(EncryptSHA3('', 384).toString()).toBe('0c63a75b845e4f7d01107d852e4c2485c51a50aaaa94fc61995e71bbee983a2ac3713831264adb47fb6bd1e058d5f004')
    expect(EncryptSHA3('test', 512).toString()).toBe('9ece086e9bac491fac5c1d1046ca11d737b92a2b2ebd93f005d7b710110c0a678288166e7fbe796883a4f2e9b3ca9f484f521d0ce464345cc1aec96779149c14')
    expect(EncryptSHA3('test', 123).toString()).toBe('9ece086e9bac491fac5c1d1046ca11d737b92a2b2ebd93f005d7b710110c0a678288166e7fbe796883a4f2e9b3ca9f484f521d0ce464345cc1aec96779149c14')
    expect(EncryptHmacSHA3('', '').toString()).toBe('a857c9f1cd9cb25c2f24a933618abfc724d4eaebf74099dddc5e0a1c7ab8de3865faa1fb039419de768e962bdc81a6d85b9809d6ab84f8cc984f5d6b90f23c15')
    expect(EncryptHmacSHA3('test', 'test').toString()).toBe('795ffe92ca19f76b04a440d60dd9723e48ad35696a9f2ed91dff69077a90b1e400072c449f9adb068f3bf98f02c3dd45002fb8ffa6895473d78bc6b20018eb3d')
})

test('Keccak Test', () => {
    expect(EncryptKeccak('test', 224).toString()).toBe('3be30a9ff64f34a5861116c5198987ad780165f8366e67aff4760b5e')
    expect(EncryptKeccak('', 256).toString()).toBe('c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470')
    expect(EncryptKeccak('test', 384).toString()).toBe('53d0ba137307d4c2f9b6674c83edbd58b70c0f4340133ed0adc6fba1d2478a6a03b7788229e775d2de8ae8c0759d0527')
    expect(EncryptKeccak('', 512).toString()).toBe('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e')
    expect(EncryptKeccak('test', 123).toString()).toBe('1e2e9fc2002b002d75198b7503210c05a1baac4560916a3c6d93bcce3a50d7f00fd395bf1647b9abb8d1afcc9c76c289b0c9383ba386a956da4b38934417789e')
})

test('Base64 Convert & Hex Convert Test', () => {
    expect(ConvertToBase64('d41d8cd98f00b204e9800998ecf8427e')).toBe('1B2M2Y8AsgTpgAmY7PhCfg==')
    expect(ConvertToHex('2jmj7l5rSw0yVb/vlWAYkK/YBwk=')).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709')
})