<template>
  <div class="layot-aside">
    <!-- 头部图片 -->
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <!-- 导航菜单 -->
    <el-menu background-color="#323745" text-color="#adafb5">
      <!-- 子菜单  没有子选择-->
      <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index='1'>
        <i class="el-icon-menu"  slot="title"></i>
        <template slot="title">内容管理 </template>
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
        <el-submenu index='2'>
        <i   class="el-icon-s-flag"  slot="title"></i>
        <template  slot="title">粉丝管理 </template>
        <el-menu-item>图片数据</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-loading"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scpoed>
.layot-aside {
  background-color: #2e2f32;
  height: 100vh;
  width: 230px;
  .title {
    text-align: center;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
  .el-menu {
    border-right: 0 ;
  }
}
</style>
