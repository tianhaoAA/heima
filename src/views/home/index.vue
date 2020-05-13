<template>
<!-- 现在最外层放置一个大容器 小容器只能放在大容器里面1 -->

<el-container>
<el-aside style="width:230px">
  <layout-aside></layout-aside>
</el-aside>
<el-container>
  <el-header>
    <layout-header></layout-header>
  </el-header>
  <!-- 这里应该放置2级路由容器 -->
  <el-main style="padding:0">
    <router-view></router-view>
  </el-main>
</el-container>
</el-container>
</template>

<script>
// import LayoutAside from './layot-aside'
// import LayoutHeader from './layot-header'
// export default {
//   components: {
//     'layout-aside': LayoutAside,
//     'layout-header': LayoutHeader
//   }
// }
export default {

}
</script>

<style>

</style>
