<template>
    <div class="common-layout">
        <el-container>
            <el-header style="padding: 0px">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#2F4F4F" active-text-color="#2F4F4F">
                    <el-menu-item index="1">
                        <h2><a href="#" style="text-decoration: none;">Awesome Tools For Programmer</a></h2>
                    </el-menu-item>
                    <el-menu-item index="2" style="margin-right: 8px; margin-left: auto; font-weight: bold;"
                        @click="recentUsing = true">Recent Using</el-menu-item>
                    <el-menu-item index="3" style="margin-right: 0px; font-weight: bold;" @click="setting = true">
                        Settings</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <router-view />
                <el-drawer v-model="recentUsing" :direction="direction">
                    <template #header>
                        <h4>Recent Using</h4>
                    </template>
                    <template #default>
                        <div>
                            content
                        </div>
                    </template>
                    <template #footer>
                        <div style="flex: auto">
                            <el-button>Clear History</el-button>
                        </div>
                    </template>
                </el-drawer>
                <el-drawer v-model="setting" :direction="direction">
                    <template #header>
                        <h4>Awesome-Tools Setting</h4>
                    </template>
                    <template #default>
                        <el-table :data="configurationItems">
                            <el-table-column prop="name" label="Configuration Name"></el-table-column>
                            <el-table-column prop="filename" label="Operation">
                                <template #default>
                                    <el-button type="primary" size="small" @click.prevent="editConfiguration">Edit</el-button>
                                    <el-button type="success" size="small" @click.prevent="exportConfiguration">Export</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <template #footer>
                        <div style="flex: auto">
                            <el-button>Clear History</el-button>
                        </div>
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
        </el-container>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import configuration from '@assets/configuration.json'

const recentUsing = ref(false)
const setting = ref(false)
const direction = ref('rtl')
const configurationItems = ref([])
const editConfigurationDialogVisible = ref(false)

onMounted(() => {
    configurationItems.value = configuration.configurations
    console.log(configurationItems.value)
})

const editConfiguration = () => {
    editConfigurationDialogVisible.value = true
}

const exportConfiguration = () => {

}
</script>
<style>
@import '@assets/global.css';

.el-menu {
    --el-menu-hover-bg-color: none;
}
</style>