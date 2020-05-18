<template>
        <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form style='margin-left:50px;'>
        <el-form-item label='标题'  label-width='100'>
            <el-input placeholder="请您输入标题" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label='内容'>
            <el-input placeholder="请您输入内容" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label='封面'>
            <el-radio-group>
                <el-radio>单图</el-radio>
                <el-radio>三图</el-radio>
                <el-radio>无图</el-radio>
                <el-radio>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label='频道'>
            <el-select placeholder="请选择频道"></el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">发表</el-button>
            <el-button>存入草稿</el-button>
        </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
