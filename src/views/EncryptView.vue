<template>
    <el-row :gutter="24" style="margin-top: 40px">
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                <el-col :span="12" style="padding-left: 0px">
                    <el-form label-position="top" :model="encryptOptions" :inline="true">
                        <el-form-item label="Encrypt Method">
                            <el-select v-model="encryptOptions.encryptMethod" filterable @change="encryptOptionChange">
                                <el-option v-for="encryptMethod in encryptMethods" :key="encryptMethod.value"
                                    :label="encryptMethod.label" :value="encryptMethod.value"
                                    style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Output Length">
                            <el-select v-model="encryptOptions.outputOption" :disabled="outputDisabled">
                                <el-option v-for="outputOption in outputOptions" :key="outputOption.value"
                                    :label="outputOption.label" :value="outputOption.value"
                                    style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Encrypt Mode">
                            <el-select v-model="encryptOptions.encryptMode" :disabled="modeAndPaddingDisabled"
                                @change="encryptOptionChange">
                                <el-option v-for="EncryptModeOption in EncryptModeOptions"
                                    :key="EncryptModeOption.value" :label="EncryptModeOption.label"
                                    :value="EncryptModeOption.value"
                                    style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Encrypt Padding">
                            <el-select v-model="encryptOptions.encryptPadding" :disabled="modeAndPaddingDisabled"
                                @change="encryptOptionChange">
                                <el-option v-for="EncryptPaddingOption in EncryptPaddingOptions"
                                    :key="EncryptPaddingOption.value" :label="EncryptPaddingOption.label"
                                    :value="EncryptPaddingOption.value"
                                    style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Display Mode" style="min-width: 212px">
                            <el-radio-group v-model="encryptOptions.displayMode">
                                <el-radio :label="0">Hex</el-radio>
                                <el-radio :label="1">Base64</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-form label-position="top" :model="encryptOptions">
                        <el-form-item label="Initialization Vector">
                            <el-input v-model="encryptOptions.iv" :disabled="ivDisabled"
                                placeholder="iv (support 16 Bytes)"></el-input>
                        </el-form-item>
                        <el-form-item label="Public Key/Secret/Salt">
                            <el-input type="textarea" :rows="5"
                                placeholder="Public Key/Secret/Salt(support 16/24/32 Bytes)"
                                v-model="encryptOptions.secret" :disabled="secretDisabled"></el-input>
                        </el-form-item>
                        <el-form-item label="Private Key">
                            <el-input type="textarea" :rows="5" placeholder="Private Key"
                                v-model="encryptOptions.privateSecret" :disabled="privateSecretDisabled"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.prevent="encrypt">Encrypt
                            </el-button>
                            <el-button type="success" style="margin-left: 16px;" @click.prevent="decrypt"
                                :disabled="decryptDisabled">Decrypt
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
    <el-row :gutter="24" style="margin-top: 24px; margin-bottom: 100px;">
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                <el-col :span="12" style="padding-left: 0px">
                    <el-row>
                        <h4 style="color: #2F4F4F">Source</h4>
                        <el-input type="textarea" :rows="16" v-model="sourceString" style="margin-top: 16px"
                            placeholder="Source content..."></el-input>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <h4 style="color: #2F4F4F">Result</h4>
                        <el-input type="textarea" :rows="16" v-model="resultString" style="margin-top: 16px"
                            placeholder="Result content..."></el-input>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
</template>
<script setup>
import { ref, onMounted } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
import { InArray } from '@assets/common'
import {
    EncryptMethods,
    OutputOptions,
    EncryptMode,
    EncryptPadding,
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
    EncryptAES,
    DecryptAES,
    EncryptTripleDES,
    DecryptTripleDES,
    EncryptHmacSHA3,
    EncryptKeccak,
    ConvertToBase64
} from '@assets/encrypt'
import { breakpointsTailwind } from '@vueuse/core';

const encryptMethods = ref([])
const sourceString = ref('')
const resultString = ref('')

const encryptOptions = ref({
    encryptMethod: 'MD5',
    outputOption: 512,
    secret: '',
    privateSecret: '',
    encryptMode: 'CBC',
    encryptPadding: 'Pkcs7',
    iv: '',
    displayMode: 0
})

const EncryptModeOptions = ref([])
const EncryptPaddingOptions = ref([])
const modeAndPaddingDisabled = ref(true)

const outputOptions = ref([])
const outputDisabled = ref(true)

const secretDisabled = ref(true)
const privateSecretDisabled = ref(true)
const decryptDisabled = ref(true)
const ivDisabled = ref(true)

const padChange = () => {

}

const encryptOptionChange = () => {
    let encryptMethod = encryptOptions.value.encryptMethod
    // if(InArray(encryptMethod, ['MD5', 'SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512', 'Keccak', 'SHA3'])){

    // }
    if (InArray(encryptMethod, ['SHA3', 'HmacSHA3', 'Keccak'])) {
        outputDisabled.value = false
    } else {
        outputDisabled.value = true
    }
    // padding and mode disabled
    if (InArray(encryptMethod, ['AES', '3DES'])) {
        modeAndPaddingDisabled.value = false
    } else {
        modeAndPaddingDisabled.value = true
    }
    // secret disabled
    if (encryptMethod.startsWith('Hmac') || InArray(encryptMethod, ['AES', '3DES'])) {
        secretDisabled.value = false
    } else {
        secretDisabled.value = true
    }
    // decrypt button disabled
    if (InArray(encryptMethod, ['AES', '3DES'])) {
        decryptDisabled.value = false
    } else {
        decryptDisabled.value = true
    }
    // iv disabled
    if (InArray(encryptMethod, ['AES', '3DES']) && encryptOptions.value.encryptMode !== 'ECB') {
        ivDisabled.value = false
    } else {
        ivDisabled.value = true
    }
}

const encrypt = () => {
    const encryptObject = encryptOptions.value

    let encryptMethod = encryptObject.encryptMethod
    let outputOption = encryptObject.outputOption
    let secret = encryptObject.secret
    let privateSecret = encryptObject.privateSecret
    let encryptMode = getEncryptModeObject(encryptObject.encryptMode)
    let encryptPadding = getEncryptPaddingObejct(encryptObject.encryptPadding)
    let enc = encryptObject.displayMode // 0 => Hex, 1 => Base64
    let iv = encryptObject.iv

    let encryptMessage = sourceString.value
    let config = {
        iv: iv,
        mode: encryptMode,
        padding: encryptPadding
    }
    switch (encryptMethod) {
        case 'MD5':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptMD5(encryptMessage)) : EncryptMD5(encryptMessage)
            break
        case 'SHA1':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptSHA1(encryptMessage)) : EncryptSHA1(encryptMessage)
            break
        case 'SHA224':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptSHA224(encryptMessage)) : EncryptSHA224(encryptMessage)
            break
        case 'SHA256':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptSHA256(encryptMessage)) : EncryptSHA256(encryptMessage)
            break
        case 'SHA384':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptSHA384(encryptMessage)) : EncryptSHA384(encryptMessage)
            break
        case 'SHA512':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptSHA512(encryptMessage)) : EncryptSHA512(encryptMessage)
            break
        case 'SHA3':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptSHA3(encryptMessage, outputOption)) : EncryptSHA3(encryptMessage, outputOption)
            break
        case 'Keccak':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptKeccak(encryptMessage, outputOption)) : EncryptKeccak(encryptMessage, outputOption)
            break
        case 'HmacMD5':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptHmacMD5(encryptMessage, secret)) : EncryptHmacMD5(encryptMessage, secret)
            break
        case 'HmacSHA1':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptHmacSHA1(encryptMessage, secret)) : EncryptHmacSHA1(encryptMessage, secret)
            break
        case 'HmacSHA224':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptHmacSHA224(encryptMessage, secret)) : EncryptHmacSHA224(encryptMessage, secret)
            break
        case 'HmacSHA256':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptHmacSHA256(encryptMessage, secret)) : EncryptHmacSHA256(encryptMessage, secret)
            break
        case 'HmacSHA384':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptHmacSHA384(encryptMessage, secret)) : EncryptHmacSHA384(encryptMessage, secret)
            break
        case 'HmacSHA512':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptHmacSHA512(encryptMessage, secret)) : EncryptHmacSHA512(encryptMessage, secret)
            break
        case 'HmacSHA3':
            resultString.value = (enc === 1) ? ConvertToBase64(EncryptHmacSHA3(encryptMessage, secret)) : EncryptHmacSHA3(encryptMessage, secret)
            break
        case 'AES':
            let aesEncryptResult = EncryptAES(encryptMessage, secret, config)
            resultString.value = `${aesEncryptResult}\n\nkey:${aesEncryptResult.key}\niv:${aesEncryptResult.iv}\nsalt:${encryptResult.salt}\nciphertext:${aesEncryptResult.ciphertext}`
            break
        case '3DES':
            let tripleDesEncryptResult = EncryptTripleDES(encryptMessage, secret, config)
            resultString.value = `${tripleDesEncryptResult}\n\nkey:${tripleDesEncryptResult.key}\niv:${tripleDesEncryptResult.iv}\nsalt:${tripleDesEncryptResult.salt}\nciphertext:${tripleDesEncryptResult.ciphertext}`
            break
        default:
            ElMessage.error(`No encrypt method: ${encryptMethod}`)
            return
    }
}

const decrypt = () => {
    const encryptObject = encryptOptions.value

    let encryptMethod = encryptObject.encryptMethod
    let secret = encryptObject.secret
    let privateSecret = encryptObject.privateSecret
    let encryptMode = getEncryptModeObject(encryptObject.encryptMode)
    let encryptPadding = getEncryptPaddingObejct(encryptObject.encryptPadding)
    let iv = encryptObject.iv

    let config = {
        iv: iv,
        mode: encryptMode,
        padding: encryptPadding
    }
    if (!secret) {
        ElMessage.error(`No secret`)
        return
    }
    let decryptMessage = sourceString.value
    if(!decryptMessage){
        ElMessage.error(`No message need to decrypt`)
        return
    }
    switch (encryptMethod) {
        case 'AES':
            try{
                resultString.value = DecryptAES(decryptMessage, secret, config)
            }catch(e){
                resultString.value = `Decrypt just allow Base64 string. Don't use Hex string.`
            }
            break
        case '3DES':
            try{
                resultString.value = DecryptTripleDES(decryptMessage, secret, config)
            }catch(e){
                resultString.value = `Decrypt just allow Base64 string. Don't use Hex string.`
            }
            break    
        default:
            ElMessage.error(`No encrypt method: ${encryptMethod}`)
            return
    }
}

// get aes encrypt mode obejct
const getEncryptModeObject = (modeValue) => {
    for (let mode of EncryptMode) {
        if (mode.value === modeValue) {
            return mode.object
        }
    }
    ElMessage.error(`No encrypt mode: ${modeValue}`)
}

// get aes encrypt padding obejct
const getEncryptPaddingObejct = (paddingValue) => {
    for (let padding of EncryptPadding) {
        if (padding.value === paddingValue) {
            return padding.object
        }
    }
    ElMessage.error(`No encrypt padding: ${paddingValue}`)
}

onMounted(() => {
    encryptMethods.value = EncryptMethods
    outputOptions.value = OutputOptions
    EncryptModeOptions.value = EncryptMode
    EncryptPaddingOptions.value = EncryptPadding
    encryptOptionChange()
})
</script>
<style scoped>
::v-deep(input) {
    font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;
}

::v-deep(textarea) {
    font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;
}
</style>