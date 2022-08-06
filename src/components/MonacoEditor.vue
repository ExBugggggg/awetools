<template>
    <div id="editor" :style="{ height: editorHeight + 'vh' }"></div>
</template>

<script setup>
/**
 * @description This is a monaco-editor component that can give you suggestion when you input your code.
 */
import * as monaco from 'monaco-editor'
import { onMounted, ref, onBeforeMount } from 'vue'
import { UnicodeToChinese } from '@assets/common'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const props = defineProps(['language', 'defaultValue', 'editorHeight'])

let monacoEditor = null
let editorHeight = ref(60)

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
}

onBeforeMount(() => {
    editorHeight.value = props.editorHeight
})

onMounted(() => {
    const model = monaco.editor.createModel(props.defaultValue, props.language)
    monacoEditor = monaco.editor.create(document.getElementById('editor'), {
        model: model
    })
})

const formatContent = () => {
    monacoEditor.trigger('', 'editor.action.formatDocument')
    let monacoContent = monacoEditor.getValue()
    monacoContent = UnicodeToChinese(monacoContent)
    monacoEditor.setValue(monacoContent)
}

const clearContent = () => {
    monacoEditor.setValue('')
}

defineExpose({ formatContent, clearContent })
</script>