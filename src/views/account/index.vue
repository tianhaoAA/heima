<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账号信息</template>
    </bread-crumb>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled style="width:30%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 头像 -->
      <img class='imggcc' src="http://imgsrc.baidu.com/forum/w=580/sign=91799a31324e251fe2f7e4f09786c9c2/2115a9529822720edcbedaf179cb0a46f31fabaf.jpg" alt="">
  </el-card>
</template>

<script>
export default {}
</script>

<style >
 .imggcc{
 position: absolute;
 right: 300px;
 top: 160px;
 width: 200px;
 height: 200px;
 border-radius: 50%;
 }
</style>
