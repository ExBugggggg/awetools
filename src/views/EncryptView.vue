<template>
    <el-row :gutter="24" style="margin-top: 24px">
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                <el-select v-model="chooseOption">
                    <el-option v-for="encryptOption in encryptOptions" :key="encryptOption.value"
                        :label="encryptOption.label" :value="encryptOption.value"
                        style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                    </el-option>
                </el-select>
                <el-button type="primary" style="margin-left: 16px;" @click.prevent="encrypt">encrypt
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
import { ref, onMounted } from '@vue/runtime-core'

const chooseOption = ref('')
const encryptOptions = ref([])
const sourceString = ref('')

onMounted(() => {
    encryptOptions.value = [
        {
            value: 0,
            label: 'AES'
        },
        {
            value: 1,
            label: 'DES'
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