<template>
  <!-- elementUI 布局组件  el-row 和el-col -->
  <el-row align="middle" type="flex" class="layout-header">
    <el-col class="left" :span="12">
            <!-- class 是动态的图标 -->
      <!-- <i class="el-icon-s-fold"></i> -->
      <i @click="collapse=!collapse" :class="{ 'el-icon-s-fold':!collapse, 'el-icon-s-unfold':collapse }"></i>

      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="12">
      <el-row type="flex" justify="end" align="middle">
 <img
        :src="userInfo.photo"
        alt
      />
      <el-dropdown trigger="click"  @command='clickMenu'>
        <!-- 显示的内容 -->
      <span> {{ userInfo.name}} </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command='info'>个人信息</el-dropdown-item>
         <el-dropdown-item command='git'>git地址</el-dropdown-item>
         <el-dropdown-item  command='qiut'>退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      </el-row>

    </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      // 用户个人信息
      userInfo: {

      },
      collapse: false
    }
  },
  watch: {
    collapse () {
      eventBus.$emit('changeCollapse')
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/tianhaoAA'
      } else if (command === 'qiut') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then((res) => {
        this.userInfo = res.data
      })
    }
  },
  created () {
    // const token = localStorage.getItem('user-token')
    this.getUserInfo()
    eventBus.$on('updateUser', () => {
      this.getUserInfo()
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
