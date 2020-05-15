<template>
<el-card>
 <bread-crumb slot="header">
      <template slot="title">
        文章列表
      </template>
 </bread-crumb>
 <!-- 搜索工具栏 筛选 -->
 <el-form style="padding-left:60px;">
     <el-form-item label="文章状态:">
         <el-radio-group v-model="value">
             <el-radio>全部</el-radio>
             <el-radio>草稿</el-radio>
             <el-radio>待审核</el-radio>
             <el-radio>审核通过</el-radio>
             <el-radio>审核失败</el-radio>
         </el-radio-group>
     </el-form-item>
     <el-form-item  label="文章频道:">
         <el-select placeholder="请选择频道"></el-select>
     </el-form-item>
     <el-form-item label="日期范围:">
         <!-- 时间选择组件  type-->
         <el-date-picker type="daterange"></el-date-picker>
     </el-form-item>
 </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      value: 2
    }
  }

}
</script>

<style>

</style>
