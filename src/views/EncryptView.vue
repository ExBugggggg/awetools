<template>
    <el-row :gutter="24" style="margin-top: 40px">
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                <el-col :span="12" style="padding-left: 0px">
                    <el-form label-position="top" :model="encryptOptions" :inline="true">
                        <el-form-item label="Encrypt Method">
                            <el-select v-model="encryptOptions.encryptMethod" filterable @change="encryptMethodChange">
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
                        <el-form-item label="AES Encrypt Mode">
                            <el-select v-model="encryptOptions.aesEncryptMode" :disabled="aesDisabled">
                                <el-option v-for="AESEncryptModeOption in AESEncryptModeOptions"
                                    :key="AESEncryptModeOption.value" :label="AESEncryptModeOption.label"
                                    :value="AESEncryptModeOption.value"
                                    style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="AES Encrypt Padding">
                            <el-select v-model="encryptOptions.aesEncryptPadding" :disabled="aesDisabled">
                                <el-option v-for="AESEncryptPaddingOption in AESEncryptPaddingOptions"
                                    :key="AESEncryptPaddingOption.value" :label="AESEncryptPaddingOption.label"
                                    :value="AESEncryptPaddingOption.value"
                                    style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-form label-position="top" :model="encryptOptions">
                        <el-form-item label="Public Key/Secret/Salt">
                            <el-input type="textarea" :rows="5" placeholder="Public Key/Secret/Salt"
                                v-model="encryptOptions.secret" :disabled="secretDisabled"></el-input>
                        </el-form-item>
                        <el-form-item label="Private Key">
                            <el-input type="textarea" :rows="5" placeholder="Private Key"
                                v-model="encryptOptions.privateSecret" :disabled="privateSecretDisabled"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.prevent="encrypt">Encrypt
                            </el-button>
                            <el-button type="success" style="margin-left: 16px;" @click.prevent="decrypt" :disabled="decryptDisabled">Decrypt
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
    AESEncryptMode,
    AESEncryptPadding,
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
    EncryptKeccak
} from '@assets/encrypt'

const encryptMethods = ref([])
const sourceString = ref('')
const resultString = ref('')

const encryptOptions = ref({
    encryptMethod: 'MD5',
    outputOption: 512,
    secret: '',
    privateSecret: '',
    aesEncryptMode: 'CBC',
    aesEncryptPadding: 'Pkcs7'
})

const AESEncryptModeOptions = ref([])
const AESEncryptPaddingOptions = ref([])
const aesDisabled = ref(true)

const outputOptions = ref([])
const outputDisabled = ref(true)

const secretDisabled = ref(true)
const privateSecretDisabled = ref(true)
const decryptDisabled = ref(true)

const encryptMethodChange = () => {
    let encryptMethod = encryptOptions.value.encryptMethod
    if(InArray(encryptMethod, ['MD5', 'SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512', 'Keccak', 'SHA3'])){

    }
    if(InArray(encryptMethod, ['SHA3', 'HmacSHA3', 'Keccak'])){
        outputDisabled.value = false
    } else {
        outputDisabled.value = true
    }
    if (encryptMethod === 'AES') {
        aesDisabled.value = false
    } else {
        aesDisabled.value = true
    }
    if(encryptMethod.startsWith('Hmac')){
        secretDisabled.value = false
    } else {
        secretDisabled.value = true
    }
}

const encrypt = () => {
    const encryptObject = encryptOptions.value

    let encryptMethod = encryptObject.encryptMethod
    let outputOption = encryptObject.outputOption
    let secret = encryptObject.secret
    let privateSecret = encryptObject.privateSecret
    let aesEncryptMode = encryptObject.aesEncryptMode
    let aesEncryptPadding = encryptObject.aesEncryptPadding

    let encryptMessage = sourceString.value
    switch (encryptMethod) {
        case 'MD5':
            resultString.value = EncryptMD5(encryptMessage)
            break
        case 'SHA1':
            resultString.value = EncryptSHA1(encryptMessage)
            break
        case 'SHA224':
            resultString.value = EncryptSHA224(encryptMessage)
            break
        case 'SHA256':
            resultString.value = EncryptSHA256(encryptMessage)
            break
        case 'SHA384':
            resultString.value = EncryptSHA384(encryptMessage)
            break
        case 'SHA512':
            resultString.value = EncryptSHA512(encryptMessage)
            break
        case 'SHA3':
            resultString.value = EncryptSHA3(encryptMessage, outputOption)
            break
        case 'Keccak':
            resultString.value = EncryptKeccak(encryptMessage, outputOption)
            break
        case 'HmacMD5':
            resultString.value = EncryptHmacMD5(encryptMessage, secret)
            break
        case 'HmacSHA1':
            resultString.value = EncryptHmacSHA1(encryptMessage, secret)
            break
        case 'HmacSHA224':
            resultString.value = EncryptHmacSHA224(encryptMessage, secret)
            break
        case 'HmacSHA256':
            resultString.value = EncryptHmacSHA256(encryptMessage, secret)
            break
        case 'HmacSHA384':
            resultString.value = EncryptHmacSHA384(encryptMessage, secret)
            break
        case 'HmacSHA512':
            resultString.value = EncryptHmacSHA512(encryptMessage, secret)
            break
        case 'HmacSHA3':
            resultString.value = EncryptHmacSHA3(encryptMessage, secret)
            break
        default:
            ElMessage.error(`No encrypt method: ${encryptMethod}`)
            return
    }
}

const decrypt = () => {

}

onMounted(() => {
    encryptMethods.value = EncryptMethods
    outputOptions.value = OutputOptions
    AESEncryptModeOptions.value = AESEncryptMode
    AESEncryptPaddingOptions.value = AESEncryptPadding
    encryptMethodChange()
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