<template>
    <el-row :gutter="24">
        <el-col :span="16" :offset="4">
            <el-row :gutter="24" justify="end">
                <el-button type="primary" @click.prevent="formatJSON">Format</el-button>
                <el-button type="danger" @click.prevent="clearContent">Clear Content</el-button>
            </el-row>
            <el-row :gutter="32" style="margin-top: 16px;">
                <el-col :span="24">
                    <MonacoEditor :language="language" :defaultValue="defaultValue" :editorHeight="60"
                        ref="monacoFunction" @keydown.alt.enter.prevent="formatJSON" @keydown.alt.delete.prevent="clearContent"></MonacoEditor>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script setup>
import MonacoEditor from '@components/MonacoEditor.vue'
import { ref } from 'vue'

const language = ref('json')
const monacoFunction = ref(null)
const defaultValue = ref('{\n    "tips": "Put json code here."\n}')

const formatJSON = () => {
    monacoFunction.value.formatContent()
}

const clearContent = () => {
    monacoFunction.value.clearContent()
}
</script>