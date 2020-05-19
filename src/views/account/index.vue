<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账号信息</template>
    </bread-crumb>
    <el-form label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input   v-model="formData.intro"  style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input style="width:30%" v-model="formData.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled style="width:30%" v-model="formData.mobile" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 头像 -->
      <img class='imggcc' :src="formData.photo" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: 'user/profile'
      }).then((res) => {
        this.formData = res.data
        console.log(res)
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
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
