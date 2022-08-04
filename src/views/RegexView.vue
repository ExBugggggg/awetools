<template>
    <el-row :gutter="24">
        <el-col :span="16" :offset="4">
            <el-row :gutter="24" justify="end">
                <el-button @click="commonRegexVisiable = true">Common Regex</el-button>
                <el-button @click="codeGenerate">Code Generate</el-button>
                <el-button style="margin-left: 8px" @click="regexTutorial = true">Regex Tutorial</el-button>
            </el-row>

            <el-row :gutter="24" style="margin-top: 24px;">
                <el-row :gutter="24" style="margin-top: 24px; color: #2F4F4F">
                    <h4>Regex</h4>
                </el-row>
                <el-input v-model="regexPattern" placeholder="Please Input Regex Pattern" style="margin-top: 24px;"
                    @change="regex">
                    <template #prepend>/</template>
                    <template #append>
                        <el-select v-model="modifiersIndex" @change="regex">
                            <el-option v-for="modifier in modifiersMap" :key="modifier.value"
                                :label="'/' + modifier.key" :value="modifier.value"
                                style="font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;">
                            </el-option>
                        </el-select>
                    </template>
                </el-input>

                <el-row :gutter="24" style="margin-top: 24px; color: #2F4F4F">
                    <h4>Source String</h4>
                </el-row>
                <el-input v-model="sourceString" placeholder="Please Input" style="margin-top: 24px;" type="textarea"
                    :autosize="{ minRows: 10, maxRows: 10 }" @change="regex"></el-input>
                <el-row :gutter="24" style="margin-top: 24px; color: #2F4F4F">
                    <h4>Result</h4>
                </el-row>
                <el-input v-model="resultString" placeholder="" style="margin-top: 24px;" type="textarea"
                    :autosize="{ minRows: 10, maxRows: 10 }" readonly="readonly"></el-input>
            </el-row>
            <el-drawer v-model="regexTutorial" title="Regex Tutorial" :direction="direction" :size="drawerSize">
                <template #header>
                    <h4>Regex Tutorial</h4>
                </template>
                <template #default>
                    <el-scrollbar ref="scrollbar">
                        <el-row>
                            <el-button link type="primary" style="font-size:medium" @click="anchor('characterclasses')">
                                1.
                                {{ characterName }}</el-button>
                        </el-row>
                        <el-row>
                            <el-button link type="primary" style="font-size:medium; margin-top: 16px;"
                                @click="anchor('anchors')">2.
                                {{ anchorsName }}</el-button>
                        </el-row>
                        <el-row>
                            <el-button link type="primary" style="font-size:medium; margin-top: 16px;"
                                @click="anchor('quantifiers')">3.
                                {{ quantifiersName }}</el-button>
                        </el-row>
                        <el-row>
                            <el-button link type="primary" style="font-size:medium; margin-top: 16px;"
                                @click="anchor('reference')">4.
                                Reference</el-button>
                        </el-row>

                        <el-row style="margin-top: 48px"></el-row>
                        <el-card class="box-card" id="characterclasses">
                            <template #header>
                                <div class="card-header">
                                    <el-button link type="primary" style="font-size:medium" @click="top">1.
                                        {{ characterName }}
                                    </el-button>
                                </div>
                            </template>
                            <el-table :data="characterClasses">
                                <el-table-column prop="symbol" label="符号" width="180">
                                    <template #default="scope">
                                        <code>{{ scope.row.symbol }}</code>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="description" label="描述">
                                    <template #default="scope">
                                        <div v-html="previewDescription(scope.row.description)"></div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                        <el-row style="margin-top: 48px"></el-row>
                        <el-card class="box-card" id="anchors">
                            <template #header>
                                <div class="card-header">
                                    <el-button link type="primary" style="font-size:medium" @click="top">2.
                                        {{ anchorsName }}
                                    </el-button>
                                </div>
                            </template>
                            <el-table :data="anchors">
                                <el-table-column prop="symbol" label="符号" width="180">
                                    <template #default="scope">
                                        <code>
                                            {{ scope.row.symbol }}
                                        </code>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="description" label="描述">
                                    <template #default="scope">
                                        <div v-html="previewDescription(scope.row.description)"></div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>

                        <el-row style="margin-top: 48px"></el-row>
                        <el-card class="box-card" id="quantifiers">
                            <template #header>
                                <div class="card-header">
                                    <el-button link type="primary" style="font-size:medium" @click="top">3.
                                        {{ quantifiersName }}
                                    </el-button>
                                </div>
                            </template>
                            <el-table :data="quantifiers">
                                <el-table-column prop="symbol" label="符号" width="180">
                                    <template #default="scope">
                                        <code>{{ scope.row.symbol }}</code>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="description" label="描述">
                                    <template #default="scope">
                                        <div v-html="previewDescription(scope.row.description)"></div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>

                        <el-row style="margin-top: 48px"></el-row>
                        <el-card class="box-card" id="reference">
                            <template #header>
                                <el-button link type="primary" style="font-size:medium" @click="top">4.
                                    Reference
                                </el-button>
                            </template>
                            <el-link type="primary" @click="redirectTo()">Regular Expression Language - Quick
                                Reference</el-link>
                        </el-card>
                        <el-row style="margin-top: 80px"></el-row>
                    </el-scrollbar>
                </template>
            </el-drawer>
            <el-dialog v-model="commonRegexVisiable">
                <el-scrollbar>
                    <el-table :data="regexDemonstrations" max-height="512" width="100%" @current-change="regexChoose">
                        <el-table-column label="Introduction" width="200">
                            <template #default="scope">
                                <p style="font-weight: bold; color:#2F4F4F">{{ scope.row.name }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="Expression">
                            <template #default="scope">
                                <code>{{ scope.row.expression }}</code>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </el-dialog>
            <el-dialog v-model="regexDemoGenerateVisiable">
                <el-scrollbar>
                    <h4>Javascript Code</h4>
                    <CodePreview :language="useLanguage" :content="renderContent" style="margin-top: 24px"></CodePreview>
                    <h4></h4>
                </el-scrollbar>
            </el-dialog>
        </el-col>
    </el-row>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { RegexDescription, RegexDemonstration, RegexCode } from '@assets/regex'
import { RedirectTo } from '@assets/common'
import CodePreview from '@components/CodePreview.vue'

const regexPattern = ref('[0-9]+')
const sourceString = ref('Address: 119.014232E, 25.45996W Email: HelloWorld@hw.com')
const resultString = ref('No Match Content')
const modifiersMap = [
    { key: 'g', value: 0 },
    { key: 'i', value: 1 },
    { key: 'm', value: 2 },
    { key: 's', value: 3 },
    { key: 'gi', value: 4 }
]

const modifiersIndex = ref(0)
const regexTutorial = ref(false)
const direction = ref('rtl')
const scrollbar = ref(0)
const drawerSize = ref('40%')
const commonRegexVisiable = ref(false)
const regexDemoGenerateVisiable = ref(false)
const characterClasses = RegexDescription.Regex.CharacterClasses.items
const characterName = RegexDescription.Regex.CharacterClasses.name
const anchors = RegexDescription.Regex.Anchors.items
const anchorsName = RegexDescription.Regex.Anchors.name
const quantifiers = RegexDescription.Regex.Quantifiers.items
const quantifiersName = RegexDescription.Regex.Quantifiers.name
const reference = RegexDescription.Reference
const regexDemonstrations = RegexDemonstration.items

const useLanguage = ref('javascript')
const renderContent = ref('console.log(\'helloworld\')')

const anchor = (id) => {
    let card = document.getElementById(id)
    scrollbar.value.setScrollTop(card.offsetTop)
}

const top = () => {
    scrollbar.value.setScrollTop(0)
}

watch([regexPattern, sourceString], ([regexPattern_nv, sourceString_nv], [regexPattern_ov, sourceString_ov]) => {
    if (regexPattern_nv !== regexPattern_ov || sourceString_nv !== sourceString_ov) {
        regex()
    }

})

const redirectTo = () => {
    RedirectTo(reference)
}

const previewDescription = (text) => {
    return text
}

const regex = () => {
    resultString.value = ''
    let modifiersString = modifiersMap[modifiersIndex.value].key
    let circleTimes = [...sourceString.value].length
    let matchTimes = 0
    try {
        if (regexPattern.value === '') {
            if (matchTimes === 0) {
                resultString.value = `Match Times: ${matchTimes}`
            }
            resultString.value = ''
            return
        }
        let reg = new RegExp(regexPattern.value, modifiersString)
        resultString.value = ''
        let resultArray = []
        let matchContent = ''
        if (modifiersString !== 'g' && modifiersString !== 'gi') {
            circleTimes = 1
        }
        while ((resultArray = reg.exec(sourceString.value)) !== null && (matchTimes < circleTimes)) {
            matchTimes += 1
            matchContent += resultArray[0] + '\n'
        }
        resultString.value += `Match Times: ${matchTimes}\n`
        if (matchContent === '') {
            resultString.value += 'No Match Content'
        } else {
            resultString.value += matchContent
        }
    } catch (e) {
        if (e instanceof SyntaxError) {
            resultString.value = e.message
        }
    }
}

const regexChoose = (val) => {
    regexPattern.value = val.expression
    commonRegexVisiable.value = false
}

const codeGenerate = () => {
    const regexCode = RegexCode('javascript', regexPattern.value, modifiersMap[modifiersIndex.value].key)
    renderContent.value = regexCode.code
    regexDemoGenerateVisiable.value = true
}

onMounted(() => {
    regex()
})

</script>
<style scoped>
@import '@assets/code-preview.css';

.el-card.is-always-shadow {
    box-shadow: none
}

.el-card {
    --el-card-border-color: none
}

input {
    font-weight: bolder;
}

::v-deep(code) {
    margin: 0 2px;
    padding: 3px 4px;
    border-radius: 3px;
    font-size: 0.9em;
    background-color: #f6f6f6;
    font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;
}

::v-deep(input) {
    font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;
}

::v-deep(textarea) {
    font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;
}

::v-deep(ul) {
    font-family: Menlo, Monaco, Consolas, Andale Mono, lucida console, Courier New, monospace;
}
</style>