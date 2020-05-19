<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账号信息</template>
    </bread-crumb>
    <el-form ref="myform" label-width="100px" :model="formData" :rules="rules">
      <el-form-item  label="用户名" prop="name">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input   v-model="formData.intro"  style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width:30%" v-model="formData.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled style="width:30%" v-model="formData.mobile" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="asveUser">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 头像 -->
      <img class='imggcc' :src="formData.photo ?formData.photo : defaultImg" alt="">
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
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
        // min 字符最低 长度 max标识最大长度
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }

        ]
      },
      defaultImg: require('../../assets/img/default.gif')
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
    },
    asveUser () {
      this.$refs.myform.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => [
          this.$message.success('保用户资料存成功')
        ]).catch(() => {
          this.$message.error('保用户资料存失败')
        })
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
