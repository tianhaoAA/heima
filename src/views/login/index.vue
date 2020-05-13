<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />

      <!-- 表单 -->
       <el-form :model='loginFrom'  ref="loginForm" :rules='loginRules' >
         <el-form-item prop='mobile'>
             <el-input  v-model="loginFrom.mobile" placeholder="请您输入手机号" ></el-input>
         </el-form-item>
         <el-form-item  prop='code'>
             <el-input  style="width:60%"   v-model="loginFrom.code"   placeholder="请输入验证码"></el-input>
             <el-button style="float:right"   plain>发送验证码</el-button>
         </el-form-item>
         <el-form-item  prop='checked'>
           <el-checkbox  v-model="loginFrom.checked" >我已阅读并同意用户协议和隐私条款</el-checkbox>
         </el-form-item>
         <el-button  @click="login" type="primary" style="width:100%">登录</el-button>
       </el-form>
          </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        // 手机号
        mobile: '17603306103',
        // 验证码
        code: '246810',
        // 是否同意用户协议
        checked: false
      },
      // 定义表单的验证规则
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '您的手机号格式不正确' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码应该是6位数字' }],
        checked: [{
          validator: function (rule, value, callback) {
            // rule 是当前校验规则
            // value 是当前要校验的字段值
            // callback 是一个回调函数 ，不论成功还是失败都要执行
            value ? callback() : callback(new Error('请仔细阅读并同意'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate().then(() => {
        this.$axios({
          url: '/authorizations',
          method: 'post',
          data: this.loginFrom

        }).then((res) => {
          window.localStorage.setItem('user-token', res.data.data.token)
          this.$message.success('登录成功')
          this.$router.push('/home')
        }).catch(() => {
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 450px;
    height: 350px;

    .title {
      text-align: center;
      margin-bottom: 30px;
      img {
          height: 40px;
             margin-bottom: 30px;

      }
    }
  }
}
</style>
