<template>
    <el-row :gutter="24" style="margin-top: 24px">
        <el-col :span="12" :offset="6">
            <el-row :gutter="24" justify="end">
                <el-input style="width: 240px" clearable v-model="searchContent" placeholder="@name:bootstrap"/>
                <el-button type="primary" style="margin-left: 16px;" @click.prevent="searchDocuments">Search</el-button>
                <el-button type="danger" style="margin-left: 8px;" :disabled="cancelDisabled">Cancel</el-button>
            </el-row>
        </el-col>
    </el-row>
    <el-row style="margin-top: 56px">
        <el-col :span="12" :offset="6">
            <div class="doc-collapse">
                <el-collapse v-model="activeNormalCollapse" v-if="useSearch === false">
                    <el-collapse-item v-for="document in documents" :key="document.name" :name="document.name"
                        :title="document.name" style="font-weight: 1000">
                        <el-table :data="document.items" style="width: 100%">
                            <el-table-column label="Document Name">
                                <template #default="scope">
                                    <el-button link type="primary"
                                        @click.prevent="openWindow(scope.row.url)">{{ scope.row.name }}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="url" label="Offical URL">
                                <template #default="scope">
                                    <el-button link type="primary"
                                        @click.prevent="openWindow(scope.row.url)">{{ scope.row.url }}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
                <el-collapse v-else-if="useSearch === true">
                    <el-collapse-item title="Search Result" style="font-weight: 1000">
                        <el-table :data="resultOfDocuments" style="width: 100%">
                            <el-table-column></el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { OpenWindow } from '@assets/common'
import { ElMessage } from 'element-plus'
import docs from '@assets/documentation.json'

const activeNormalCollapse = ref(['1'])
const documents = ref([])
const resultOfDocuments = ref([])
const searchContent = ref('')
const cancelDisabled = ref(true)
const useSearch = ref(false)

onMounted(() => {
    documents.value = docs.documentation
    activeNormalCollapse.value = docs.documentation[0].name
})

const searchDocuments = () => {
    if(!searchContent.value.includes(':')){
        ElMessage({
            message: `Invalid search parameter. You need add ':' character between search type and search keywords.`,
            type: 'warning'
        })
        return
    }
    if(!searchContent.value.startsWith('@')){
        ElMessage({
            message: `Invalid search parameter. You need start with '@' character.`,
            type: 'warning'
        })
        return
    }
    let splitCharacterIndex = searchContent.value.indexOf(':')
    let checkType = false
    switch(searchContent.value.slice(1, splitCharacterIndex)){
        case 'name':
            checkType = true
            break
        default:
            checkType = false
    }
    if(!checkType){
        ElMessage({
            message: `Undefined search type '${searchContent.value.slice(1, splitCharacterIndex)}'`,
            type: 'warning'
        })
        return
    }
    // todo: finish fetch search keyword
    console.log(searchContent.value.slice(1, splitCharacterIndex))
}

const openWindow = (url) => {
    OpenWindow(url)
}
</script>
<style scoped>
::v-deep(.el-collapse-item__header) {
    font-size: large;
    font-weight: 1000 !important;
}
</style>