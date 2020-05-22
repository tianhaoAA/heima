<template>
  <div class="layot-aside">
    <!-- 头部图片 -->
    <div class="title">
      <img :src="collapse?smallImg: bgiImg" alt />
    </div>
    <!-- 导航菜单 -->
    <el-menu :collapse='collapse' :router="true" background-color="#323745" text-color="#adafb5">
      <!-- 子菜单  没有子选择-->
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index='1'>
        <i class="el-icon-menu"  slot="title"></i>
        <span slot="title">内容管理</span>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/artices">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/marerial">素材管理</el-menu-item>
      </el-submenu>
        <el-submenu index='2'>
        <i   class="el-icon-s-flag"  slot="title"></i>
        <!-- <template>粉丝管理 </template> -->
        <span slot="title">粉丝管理</span>
        <el-menu-item index="/home/picture">图片数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">内容列表</el-menu-item>
        <el-menu-item index="/home/fansiphoto">评论列表</el-menu-item>
        <el-menu-item index="/home/fansilist">素材管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-loading"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['collapse'],
  data () {
    return {
      bgiImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scpoed>
.layot-aside {
  background-color: #2e2f32;
  height: 100vh;
  // width: 230px;
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
