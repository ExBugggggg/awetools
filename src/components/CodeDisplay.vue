<template>
    <div style="background-color: #f5f2f0;">
        <el-row v-if="needCopy" justify="end" style="margin-right: 32px; padding-top: 16px">
            <el-tooltip content="Copy to clipboard" placement="top">
                <el-button link type="primary" data-clipboard-target="#codeContent" data-clipboard-action="copy">
                    <el-icon>
                        <DocumentCopy />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </el-row>
        <pre><code style="line-height: 24px;"><div id="codeContent" v-html="renderHtml" style="margin-left: 24px;"></div></code></pre>
    </div>
</template>
<script setup>
// todo: finish clipboard function
import Prism from 'prismjs'
// import Clipboard from 'clipboard'

import { onMounted, ref } from 'vue'
const props = defineProps(['language', 'defaultValue', 'needCopy'])

const renderHtml = ref('')
onMounted(() => {
    renderHtml.value = Prism.highlight(props.defaultValue, Prism.languages.javascript, props.language)
})
</script>