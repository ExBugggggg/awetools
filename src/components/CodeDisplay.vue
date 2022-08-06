<template>
    <div id="showCode" :style="{ height: editorHeight + 'vh' }"></div>
</template>

<script setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref, onBeforeMount } from 'vue'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

const props = defineProps(['language', 'defaultValue', 'editorHeight'])
let monacoEditor = null
let editorHeight = ref(60)


self.MonacoEnvironment = {
    getWorker() {
        return new editorWorker()
    }
}


onBeforeMount(() => {
    editorHeight.value = props.editorHeight
})

onMounted(() => {
    const model = monaco.editor.createModel(props.defaultValue, props.language)
    monacoEditor = monaco.editor.create(document.getElementById('showCode'), {
        model: model
    })
})

const destoryEditor = () => {
    monacoEditor.dispose()
}


defineExpose({ destoryEditor })
</script>