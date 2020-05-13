<template>
<!-- 现在最外层放置一个大容器 小容器只能放在大容器里面1 -->

<el-container>
<el-aside>
  <h1>左侧导航</h1>
</el-aside>
<el-container>
  <el-header>头部</el-header>
  <!-- 这里应该放置2级路由容器 -->
  <el-mian>主要区域</el-mian>
</el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
