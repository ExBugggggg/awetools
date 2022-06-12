<template>
    <el-row :gutter="24">
        <el-col :span="16" :offset="4">
            <el-row :gutter="24" justify="end">
                <el-select></el-select>
                <el-button style="margin-left: 8px" @click="regexTutorial = true">Regex Tutorial</el-button>
            </el-row>

            <el-row :gutter="24" style="margin-top: 24px;">
                <el-row :gutter="24" style="margin-top: 24px; color: #2F4F4F">
                    <h4>Regex</h4>
                </el-row>
                <el-input v-model="regexPattern" placeholder="Please Input Regex Pattern" style="margin-top: 24px;" @change="regex">
                    <template #prepend>/</template>
                    <template #append>
                        <el-select v-model="modifiersIndex" @change="regex">
                            <el-option v-for="modifier in modifiersMap" :key="modifier.value" :label="'/' + modifier.key" :value="modifier.value"></el-option>
                        </el-select>
                    </template>
                </el-input>

                <el-row :gutter="24" style="margin-top: 24px; color: #2F4F4F">
                    <h4>Source String</h4>
                </el-row>
                <el-input v-model="sourceString" placeholder="Please Input" style="margin-top: 24px;" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }" @change="regex"></el-input>
                <el-row :gutter="24" style="margin-top: 24px; color: #2F4F4F">
                    <h4>Result</h4>
                </el-row>
                <el-input v-model="resultString" placeholder="" style="margin-top: 24px;" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }" readonly="readonly"></el-input>
            </el-row>
            <!-- <el-row :gutter="24" style="margin-top: 16px">
                <el-col :span="24">
                    <MonacoEditor :language="language" :defaultValue="defaultValue" :editorHeight="30"
                        ref="monacoFunction"></MonacoEditor>
                </el-col>
            </el-row> -->
            <el-drawer v-model="regexTutorial" title="Regex Tutorial" :direction="direction">
                <template #header>
                    <h4>Regex Tutorial</h4>
                </template>
                <template #default>
                    <el-scrollbar ref="scrollbar">
                        <el-row>
                            <el-button link type="primary" style="font-size:medium" @click="anchor('matecharacter')">1.
                                元字符</el-button>
                        </el-row>
                        <el-row>
                            <el-button link type="primary" style="font-size:medium; margin-top: 16px;"
                                @click="anchor('quanlifiers')">2.
                                量词</el-button>
                        </el-row>

                        <el-row style="margin-top: 48px"></el-row>
                        <el-card class="box-card" id="matecharacter">
                            <template #header>
                                <div class="card-header">
                                    <el-button link type="primary" style="font-size:medium" @click="top">元字符
                                    </el-button>
                                </div>
                            </template>
                            <el-table :data="mateCharacterData">
                                <el-table-column prop="symbol" label="符号" width="180" />
                                <el-table-column prop="description" label="描述"></el-table-column>
                            </el-table>
                        </el-card>


                        <el-row style="margin-top: 48px"></el-row>
                        <el-card class="box-card" id="quanlifiers">
                            <template #header>
                                <div class="card-header">
                                    <el-button link type="primary" style="font-size:medium" @click="top">量词
                                    </el-button>
                                </div>
                            </template>
                            <el-table :data="quanlifiersData">
                                <el-table-column prop="symbol" label="符号" width="180" />
                                <el-table-column prop="description" label="描述"></el-table-column>
                            </el-table>
                        </el-card>

                        <el-row style="margin-top: 80px"></el-row>
                    </el-scrollbar>
                </template>
            </el-drawer>
        </el-col>
    </el-row>
</template>
<script setup>
import MonacoEditor from '../components/MonacoEditor.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { componentSizeMap } from 'element-plus';
import { result } from 'lodash';

// const language = ref('python')
const regexPattern = ref('[0-9]+')
const sourceString = ref('Address: 119.014232E, 25.45996W Email: HelloWorld@hw.com')
const resultString = ref('No Value')
// const monacoFunction = ref(null)

const modifiersMap = [
    {key: 'g', value: 0},
    {key: 'i', value: 1},
    {key: 'm', value: 2},
    {key: 's', value: 3}
]

const modifiersIndex = ref(0)
const regexTutorial = ref(false)
const direction = ref('rtl')
const scrollbar = ref(0)
const mateCharacterData = [
    {
        symbol: `.`,
        description: `匹配除换行符以外的任意字符。`
    },
    {
        symbol: `[]`,
        description: `字符类，匹配方括号中包含的任意字符。`
    },
    {
        symbol: `[^ ]`,
        description: `否定字符类。匹配方括号中不包含的任意字符。`
    },
    {
        symbol: `*`,
        description: `匹配前面的子表达式零次或多次。`
    },
    {
        symbol: `+`,
        description: `匹配前面的子表达式一次或多次。`
    },
    {
        symbol: `?`,
        description: `匹配前面的子表达式零次或一次，或指明一个非贪婪限定符。`
    },
    {
        symbol: `{n,m}`,
        description: `花括号，匹配前面字符至少 n 次，但是不超过 m 次。`
    },
    {
        symbol: `(xyz)`,
        description: `字符组，按照确切的顺序匹配字符 xyz。`
    },
    {
        symbol: `|`,
        description: `分支结构，匹配符号之前的字符或后面的字符。`
    },
    {
        symbol: `\\`,
        description: `转义符，它可以还原元字符原来的含义，允许你匹配保留字符 [ ] ( ) { } . * + ? ^ $ \\ |`
    },
    {
        symbol: `^`,
        description: `匹配行的开始。`
    },
    {
        symbol: `$`,
        description: `匹配行的结束。`
    }
]
const quanlifiersData = [
    {
        symbol: `^`,
        description: `匹配行的开始。`
    },
    {
        symbol: `$`,
        description: `匹配行的结束。`
    }
]

const anchor = (id) => {
    let card = document.getElementById(id)
    scrollbar.value.setScrollTop(card.offsetTop)
}

const top = () => {
    scrollbar.value.setScrollTop(0)
}

watch([regexPattern, sourceString], ([regexPattern_nv, sourceString_nv], [regexPattern_ov, sourceString_ov]) => {
    regex()
})

const regex = () => {
    resultString.value = ''
    let modifiersString = modifiersMap[modifiersIndex.value].key
    try{
        let reg =new RegExp(regexPattern.value, modifiersString)
        resultString.value = ''
        let resultArray;
        while((resultArray = reg.exec(sourceString.value)) !== null){
            resultString.value += resultArray[0] + '\n'
        }
        if(resultString.value === ''){
            resultString.value = 'No Value'
        }
    }catch(e){
        if(e instanceof SyntaxError){
            resultString.value = e.message
        }
    }
}

onMounted(() => {
    regex()
})

</script>
<style scoped>
.el-card.is-always-shadow {
    box-shadow: none
}

.el-card {
    --el-card-border-color: none
}

input {
    font-weight: bolder;
}
</style>