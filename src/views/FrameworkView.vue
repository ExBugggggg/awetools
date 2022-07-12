<template>
    <el-row :gutter="24" style="margin-top: 24px">
        <el-col :span="12" :offset="6">
            <el-row :gutter="24" justify="end">
                <el-input style="width: 240px" clearable v-model="searchContent" placeholder="@name:bootstrap"/>
                <el-button type="primary" style="margin-left: 16px;" @click.prevent="searchDocuments">Search</el-button>
                <el-button type="danger" style="margin-left: 8px;" :disabled="cancelDisabled" @click.prevent="cancelSearch">Cancel</el-button>
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
                <el-collapse v-else-if="useSearch === true" v-model="activeSearchCollapse">
                    <el-collapse-item title="Search Result" style="font-weight: 1000" name="Search Result">
                        <el-table :data="resultOfDocuments" style="width: 100%">
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
const activeSearchCollapse = ref(['Search Result'])
const documents = ref([])
const resultOfDocuments = ref([])
const searchContent = ref('')
const cancelDisabled = ref(true)
const useSearch = ref(false)

onMounted(() => {
    documents.value = docs.documentation
    activeNormalCollapse.value = activeAllCollapse()
})

const activeAllCollapse = () => {
    let collapseName = []
    for(let x of documents.value){
        collapseName.push(x.name)
    }
    return collapseName
}

const searchDocuments = () => {
    
    if(!searchContent.value.startsWith('@')){
        ElMessage({
            message: `Invalid search parameter. You need start with '@' character.`,
            type: 'warning'
        })
        return
    }
    if(!searchContent.value.includes(':')){
        ElMessage({
            message: `Invalid search parameter. You need add ':' character between search type and search keywords.`,
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
    let searchKeyword = searchContent.value.slice(splitCharacterIndex + 1, )
    resultOfDocuments.value = extractDocumentItems(searchKeyword)
    switchDisplayContent()
}

const extractDocumentItems = (keyword) => {
    let documentItems = []
    for(let x in documents.value){
        for(let y in documents.value[x]){
            if(y === 'items'){
                let items = documents.value[x][y]
                for(let z in items){
                    // turn to lowercase
                    if((items[z].name.toLowerCase()).includes(keyword.toLowerCase())){
                        documentItems.push(items[z])
                    }
                }
            }
        }
    }
    return documentItems
}

const cancelSearch = () => {
    searchContent.value = ''
    resultOfDocuments.value = []
    switchDisplayContent()
}

const switchDisplayContent = () => {
    if(resultOfDocuments.value.length !== 0){
        useSearch.value = true
        cancelDisabled.value = false
    }else{
        useSearch.value = false
        cancelDisabled.value = true
    }
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