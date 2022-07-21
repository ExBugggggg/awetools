<template>
    <el-row :gutter="24">
        <!-- eslint-disable vue/no-v-text-v-html-on-component -->
        <el-col :span="12" :offset="6" style="margin-top: 24px" v-html="markdownContent" class="markdown-body">
        </el-col>
        <!-- eslint-enable -->
    </el-row>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import 'github-markdown-css'
import { marked } from 'marked'
import manual from '@assets/manual.md?raw'

const markdownContent = ref('')

onMounted(() => {
    markdownContent.value = marked.parse(manual)
})
</script>
<style scoped>

.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px
    }
}
</style>