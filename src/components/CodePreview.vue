<template>
    <pre><code :class="'language-' + language">{{ content }}</code></pre>
</template>
<script setup>
import { onMounted } from 'vue'
import Prism from 'prismjs'

defineProps({
    content: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: 'json'
    }
})

onMounted(() => {
    Prism.highlightAll()
})

</script>