<template>
    <div class="common-layout" style="min-width: 992px">
        <el-container>
            <el-header style="padding: 0px">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#2F4F4F" active-text-color="#2F4F4F">
                    <el-menu-item index="1" @click="RedirectTo('#')">
                        <h2><a style="text-decoration: none;">Awesome Tools For Programmer</a></h2>
                    </el-menu-item>
                    <el-menu-item index="2" style="margin-right: 8px; margin-left: auto; font-weight: bold;"
                        @click="quickAccess = true">Quick Access</el-menu-item>
                    <el-menu-item index="3" style="margin-right: 0px; font-weight: bold;" @click="redirectTo('manual')">
                        Manual & Help</el-menu-item>
                    <el-menu-item index="4" style="margin-right: 0px; font-weight: bold;" @click="setting = true">
                        Settings</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <router-view />
                <el-drawer v-model="quickAccess" :direction="direction">
                    <template #header>
                        <h4>Quick Access</h4>
                    </template>
                    <template #default>
                        <el-scrollbar ref="scrollbar">
                            <div v-for="quickAccessItem of quickAccessItems" :key="quickAccessItem.name">
                                <el-row style="margin-top: 8px">
                                    <el-button link type="primary"
                                        style="font-size:large; color: #2F4F4F; text-decoration: underline;"
                                        @click="redirectTo(quickAccessItem.pageName)">{{ quickAccessItem.index + '. ' +
                                                quickAccessItem.name
                                        }}</el-button>
                                </el-row>
                            </div>
                        </el-scrollbar>
                    </template>
                </el-drawer>
                <el-drawer v-model="setting" :direction="direction">
                    <template #header>
                        <h4>Awesome-Tools Setting</h4>
                    </template>
                    <template #default>
                        <el-empty description="This function will be released in the future." :image-size="200" />
                    </template>
                    <template #footer>
                    </template>
                </el-drawer>
                <el-dialog v-model="editConfigurationDialogVisible" title="Edit" width="60%">
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="editConfigurationDialogVisible = false" type="danger">Cancel</el-button>
                            <el-button @click="saveConfiguration" type="success">Save</el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-main>
            <el-footer style="padding: 0px">
                
            </el-footer>
        </el-container>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { RedirectTo } from '@assets/common'
import configuration from '@assets/configuration.json'
import { useRouter } from 'vue-router'

const router = useRouter()
const quickAccess = ref(false)
const setting = ref(false)
const direction = ref('rtl')
const quickAccessItems = ref([])
const editConfigurationDialogVisible = ref(false)

const redirectTo = (pageName) => {
    quickAccess.value = false
    router.push({ name: pageName })
}

onMounted(() => {
    quickAccessItems.value = configuration.quickaccess
})

</script>
<style>
@import '@assets/global.css';

.el-menu {
    --el-menu-hover-bg-color: none;
}
</style>