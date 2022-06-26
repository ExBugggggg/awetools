<template>
    <div class="common-layout">
        <el-container>
            <el-header style="padding: 0px">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#2F4F4F" active-text-color="#2F4F4F">
                    <el-menu-item index="1">
                        <h2><a href="#" style="text-decoration: none;">Awesome Tools For Programmer</a></h2>
                    </el-menu-item>
                    <el-menu-item index="2" style="margin-right: 0px; margin-left: auto; font-weight: bold;"
                        @click="recentUsing = true">Recent Using</el-menu-item>
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
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    const recentUsing = ref(false)
    const direction = ref('rtl')
</script>
<style>
    @import '@assets/global.css';

    .el-menu {
        --el-menu-hover-bg-color: none;
    }
</style>