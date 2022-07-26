<template>
    <el-row :gutter="24" style="margin-top: 24px">
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                <el-select v-model="chooseOption">
                    <el-option v-for="convertOption in convertOptions" :key="convertOption.value"
                        :label="convertOption.label" :value="convertOption.value"
                        style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                    </el-option>
                </el-select>
                <el-button type="primary" style="margin-left: 16px;" @click.prevent="characterConvert">Convert
                </el-button>
            </el-row>
        </el-col>

    </el-row>
    
    <el-row :gutter="24" style="margin-top: 24px">
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                <el-col :span="12" style="padding-left: 0px">
                    <el-row>
                        <h4 style="color: #2F4F4F">Source</h4>
                        <el-input type="textarea" :rows="24" v-model="sourceString" style="margin-top: 16px"></el-input>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <h4 style="color: #2F4F4F">Result</h4>
                        <el-input type="textarea" :rows="24" v-model="resultString" style="margin-top: 16px"></el-input>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
</template>
<script setup>
import {
    ChineseToUnicode,
    UnicodeToChinese,
    Base64Encode,
    Base64Decode,
    XToChinese,
    ChineseToX,
    ASCIIToChinese,
    ChineseToASCII,
} from '@assets/common'
import { ref, onMounted } from 'vue'

const convertOptions = ref([])
const chooseOption = ref('')

const sourceString = ref('')
const resultString = ref('')

const characterConvert = () => {
    if (chooseOption.value === 0) {
        resultString.value = UnicodeToChinese(sourceString.value)
    } else if (chooseOption.value === 1) {
        resultString.value = ChineseToUnicode(sourceString.value)
    } else if (chooseOption.value === 2) {
        resultString.value = Base64Encode(sourceString.value)
    } else if (chooseOption.value === 3) {
        resultString.value = Base64Decode(sourceString.value)
    } else if (chooseOption.value === 4) {
        resultString.value = ChineseToASCII(sourceString.value)
    } else if (chooseOption.value === 5) {
        resultString.value = ASCIIToChinese(sourceString.value)
    } else if (chooseOption.value === 6) {
        resultString.value = ChineseToX(sourceString.value)
    } else if (chooseOption.value === 7) {
        resultString.value = XToChinese(sourceString.value)
    }
}

onMounted(() => {
    convertOptions.value = [
        {
            value: 0,
            label: 'Unicode To Chinese'
        },
        {
            value: 1,
            label: 'Chinese To Unicode'
        },
        {
            value: 2,
            label: 'Base64 Encode(UTF-8)'
        },
        {
            value: 3,
            label: 'Base64 Decode(UTF-8)'
        },
        {
            value: 4,
            label: 'Chinese To ASCII'
        },
        {
            value: 5,
            label: 'ASCII To Chinese'
        },
        {
            value: 6,
            label: 'Chinese To &#xXXXX'
        },
        {
            value: 7,
            label: '&#xXXXX To Chinese'
        }
    ]
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