<template>
    <el-row :gutter="24" style="margin-top: 24px">
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                <el-input style="width: 240px" clearable placeholder="@name:bootstrap"/>
                <el-button type="primary" style="margin-left: 16px;">Search</el-button>
                <el-button type="danger" style="margin-left: 8px;">Cancel</el-button>
            </el-row>
        </el-col>
        <el-col :span="14" :offset="5">
            <el-row :gutter="24" justify="start">
                
            </el-row>
        </el-col>
    </el-row>
</template>
<script setup>
import { ChineseToUnicode } from '@assets/'
</script>