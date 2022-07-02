<template>
    <el-row :gutter="24" style="margin-top: 24px">
        <el-col :span="12" :offset="6">
            <el-row :gutter="24" justify="end">
                <el-button el-button type="primary">Format</el-button>
                <el-button type="danger">Clear Content</el-button>
            </el-row>
            
        </el-col>
    </el-row>
    <el-row style="margin-top: 56px">
        <el-col :span="12" :offset="6">
            <div class="doc-collapse">
                <el-collapse v-model="activeCollapse">
                    <el-collapse-item v-for="document in documents" :key="document.name" :name="document.name"
                        :title="document.name" style="font-weight: 1000">
                            
                        </el-collapse-item>
                </el-collapse>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import docs from '@assets/documentation.json'

const activeCollapse = ref(['1'])
const documents = ref([])

onMounted(() => {
    documents.value = docs.documentation
    activeCollapse.value = docs.documentation[0].name
})
</script>
<style scoped>
::v-deep(.el-collapse-item__header) {
    font-size: large;
    font-weight: 1000 !important;
}
</style>