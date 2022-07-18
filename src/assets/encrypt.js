import {
    MD5,
    SHA1,
    SHA224,
    SHA256,
    SHA384,
    SHA512,
    HmacMD5,
    HmacSHA1,
    HmacSHA3,
    HmacSHA224,
    HmacSHA256,
    HmacSHA384,
    HmacSHA512,
    AES,
    TripleDES,
    Rabbit,
    RC4,
    mode,
    pad,
    enc
} from "crypto-js"

import {
    keccak_224,
    keccak_256,
    keccak_384,
    keccak_512,
    sha3_224,
    sha3_256,
    sha3_384,
    sha3_512
} from "js-sha3"

// Code convert
const ConvertToHex = (message) => {
    return enc.Hex.stringify(message)
}
const ConvertToBase64 = (message) => {
    return enc.Base64.stringify(message)
}

// message-digest algorithm method
const EncryptMD5 = (message) => {
    return MD5(message)
}
const EncryptHmacMD5 = (message, secret) => {
    return HmacMD5(message, secret)
}
const EncryptSHA1 = (message) => {
    return SHA1(message)
}
const EncryptHmacSHA1 = (message, secret) => {
    return HmacSHA1(message, secret)
}
const EncryptSHA224 = (message) => {
    return SHA224(message)
}
const EncryptHmacSHA224 = (message, secret) => {
    return HmacSHA224(message, secret)
}
const EncryptSHA256 = (message) => {
    return SHA256(message)
}
const EncryptHmacSHA256 = (message, secret) => {
    return HmacSHA256(message, secret)
}
const EncryptSHA384 = (message) => {
    return SHA384(message)
}
const EncryptHmacSHA384 = (message, secret) => {
    return HmacSHA384(message, secret)
}
const EncryptSHA512 = (message) => {
    return SHA512(message)
}
const EncryptHmacSHA512 = (message, secret) => {
    return HmacSHA512(message, secret)
}
const EncryptSHA3 = (message, output) => {
    if (output === 224) {
        return sha3_224(message)
    } else if (output === 256) {
        return sha3_256(message)
    } else if (output === 384) {
        return sha3_384(message)
    } else {
        return sha3_512(message)
    }
}
const EncryptHmacSHA3 = (message, secret) => {
    return HmacSHA3(message, secret)
}
const EncryptKeccak = (message, output) => {
    if (output === 224) {
        return keccak_224(message)
    } else if (output === 256) {
        return keccak_256(message)
    } else if (output === 384) {
        return keccak_384(message)
    } else {
        return keccak_512(message)
    }
}

// Just support utf-8
const EncryptAES = (message, secret, config) => {
    let encryptAES = AES.encrypt(message, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv),
        padding: config.padding,
        mode: config.mode
    })
    return encryptAES
}
const DecryptAES = (encrypted, secret, config) => {
    let decryptAES = AES.decrypt(encrypted, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv),
        padding: config.padding,
        mode: config.mode
    })
    return decryptAES.toString(enc.Utf8)
}

const EncryptTripleDES = (message, secret, config) => {
    let encryptTripleDES = TripleDES.encrypt(message, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv),
        padding: config.padding,
        mode: config.mode
    })
    return encryptTripleDES
}

const DecryptTripleDES = (encrypted, secret, config) => {
    let decryptTripleDES = TripleDES.decrypt(encrypted, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv),
        padding: config.padding,
        mode: config.mode
    })
    return decryptTripleDES.toString(enc.Utf8)
}

const EncryptRabbit = (message, secret, config) => {
    let encryptRabbit = Rabbit.encrypt(message, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv)
    })
    return encryptRabbit
}

const DecryptRabbit = (encrypted, secret, config) => {
    let decryptRabbit = Rabbit.decrypt(encrypted, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv)
    })
    return decryptRabbit.toString(enc.Utf8)
}

const EncryptRC4 = (message, secret, config) => {
    let encryptRC4 = RC4.encrypt(message, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv)
    })
    return encryptRC4
}

const DecryptRC4 = (encrypted, secret, config) => {
    let decryptRC4 = RC4.decrypt(encrypted, enc.Utf8.parse(secret), {
        iv: enc.Utf8.parse(config.iv)
    })
    return decryptRC4.toString(enc.Utf8)
}

const EncryptMethods = [
    {
        value: 'MD5',
        label: 'MD5'
    }, {
        value: 'SHA1',
        label: 'SHA1'
    }, {
        value: 'Keccak',
        label: 'Keccak'
    }, {
        value: 'SHA3',
        label: 'SHA3'
    }, {
        value: 'SHA224',
        label: 'SHA224'
    }, {
        value: 'SHA256',
        label: 'SHA256'
    }, {
        value: 'SHA384',
        label: 'SHA384'
    }, {
        value: 'SHA512',
        label: 'SHA512'
    }, {
        value: 'HmacMD5',
        label: 'HmacMD5'
    }, {
        value: 'HmacSHA1',
        label: 'HmacSHA1'
    }, {
        value: 'HmacSHA3',
        label: 'HmacSHA3'
    }, {
        value: 'HmacSHA224',
        label: 'HmacSHA224'
    }, {
        value: 'HmacSHA256',
        label: 'HmacSHA256'
    }, {
        value: 'HmacSHA384',
        label: 'HmacSHA384'
    }, {
        value: 'HmacSHA512',
        label: 'HmacSHA512'
    }, {
        value: 'AES',
        label: 'AES'
    }, {
        value: '3DES',
        label: '3DES'
    }, {
        value: 'Rabbit',
        label: 'Rabbit'
    }, {
        value: 'RC4',
        label: 'RC4'
    }
]

const OutputOptions = [
    {
        value: 512,
        label: '512 bits'
    },
    {
        value: 384,
        label: '384 bits'
    },
    {
        value: 256,
        label: '256 bits'
    },
    {
        value: 224,
        label: '224 bits'
    }
]

// encrypt mode
const EncryptMode = [
    {
        value: 'CBC',
        object: mode.CBC,
        label: 'CBC'
    },
    {
        value: 'CFB',
        object: mode.CFB,
        label: 'CFB'
    },
    {
        value: 'CTR',
        object: mode.CTR,
        label: 'CTR'
    },
    {
        value: 'OFB',
        object: mode.OFB,
        label: 'OFB'
    },
    {
        value: 'ECB',
        object: mode.ECB,
        label: 'ECB'
    }
]

// encrypt padding
const EncryptPadding = [
    {
        value: 'Pkcs7',
        object: pad.Pkcs7,
        label: 'Pkcs7'
    },
    {
        value: 'Iso97971',
        object: pad.Iso97971,
        label: 'Iso97971'
    },
    {
        value: 'AnsiX923',
        object: pad.AnsiX923,
        label: 'AnsiX923'
    },
    {
        value: 'Iso10126',
        object: pad.Iso10126,
        label: 'Iso10126'
    },
    {
        value: 'ZeroPadding',
        object: pad.ZeroPadding,
        label: 'ZeroPadding'
    },
    {
        value: 'NoPadding',
        object: pad.NoPadding,
        label: 'NoPadding'
    }
]

export {
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
    EncryptAES,
    DecryptAES,
    EncryptTripleDES,
    DecryptTripleDES,
    EncryptRabbit,
    DecryptRabbit,
    EncryptRC4,
    DecryptRC4,
    EncryptKeccak,
    EncryptMethods,
    OutputOptions,
    EncryptMode,
    EncryptPadding,
    ConvertToBase64,
    ConvertToHex
}