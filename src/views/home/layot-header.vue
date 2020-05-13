<template>
  <!-- elementUI 布局组件  el-row 和el-col -->
  <el-row align="middle" type="flex" class="layout-header">
    <el-col class="left" :span="12">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="12">
      <el-row type="flex" justify="end" align="middle">
 <img
        :src="userInfo.photo"
        alt
      />
      <el-dropdown trigger="click">
        <!-- 显示的内容 -->
      <span> {{ userInfo.name}} </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item>个人信息</el-dropdown-item>
         <el-dropdown-item>git地址</el-dropdown-item>
         <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      </el-row>

    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      // 用户个人信息
      userInfo: {

      }
    }
  },
  methods: {

  },
  created () {
    const token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then((res) => {
      this.userInfo = res.data.data
      console.log(res)
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  .left {
    i {
      font-size: 20px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
