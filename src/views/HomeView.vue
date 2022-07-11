<template>
    <el-row :gutter="24">
        <el-col :span="16" :offset="4">
            <el-row :gutter="32">
                <el-col :span="8">
                    <el-card shadow="hover" @click="redirectTo('json')">
                        <div style="padding: 3vh">
                            <el-row justify="center">
                                <i data-feather="code"></i>
                            </el-row>
                        </div>
                        <div style="padding: 2vh">
                            <el-row justify="center">
                                <span>JSON Formatter</span>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" @click="redirectTo('regex')">
                        <div style="padding: 3vh">
                            <el-row justify="center">
                                <i data-feather="type"></i>
                            </el-row>
                        </div>
                        <div style="padding: 2vh">
                            <el-row justify="center">
                                <span>Regex Validator</span>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" @click="redirectTo('framework')">
                        <div style="padding: 3vh">
                            <el-row justify="center">
                                <i data-feather="book"></i>
                            </el-row>
                        </div>
                        <div style="padding: 2vh">
                            <el-row justify="center">
                                <span>Framework Documentation</span>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import feather from 'feather-icons'

const router = useRouter()
onMounted(() => {
    feather.replace()
})

const redirectTo = (pageName) => {
    router.push({ name: pageName })
}

</script>