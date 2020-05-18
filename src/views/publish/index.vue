<template>
        <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="myForm" style='margin-left:50px;' label-width='100px'  :model="publishForm" :rules="publishRules">
        <el-form-item label='标题'  prop="title">
            <el-input v-model="publishForm.title" placeholder="请您输入标题" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label='内容' prop="content">
            <!-- <el-input v-model="publishForm.content" placeholder="请您输入内容" type="textarea" :rows="5"></el-input> -->
       <quill-editor  v-model="publishForm.content" style="height:300px" placeholder="请您输入内容" ></quill-editor>
        </el-form-item>
        <el-form-item label='封面' prop="cover" style="margin-top:120px">
            <el-radio-group v-model="publishForm.cover.type">
                <!-- 需要给el-radio 加label值 -->
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label='频道' prop="channel_id">
      <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
              <!-- 下拉选项 v-for 循环生成 el-option-->
              <!-- label 显示值  value 保存值 -->
                       <el-option v-for="item in channles" :label="item.name" :value="item.id"  :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="publish(false)">发表</el-button>
            <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 接收频道数据内容
      channles: [],
      publishForm: {
        title: '',
        content: '',
        cover: {
          // -1是自动 0是无图 1是单图 3是三图
          type: 0,
          //   跟type 对应
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题应该是5-30个字符之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取文章数据的方法
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then((res) => {
        this.publishForm = res.data
      })
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channles = res.data.channels
      })
    },
    // 发布文章的方法
    publish (draft) {
      this.$refs.myForm.validate().then(() => {
        const { id } = this.$route.params
        this.$axios({
          url: id ? `/articles/${id}` : '/articles',
          method: id ? 'put' : 'post',
          params: { draft },
          data: this.publishForm
        }).then(() => {
          this.$message.success('发布成功')
          this.$router.push('/home/artices')
        }).catch(() => {
          this.$message.error('发布失败')
        })
        // if (id) {
        //   this.$axios({
        //     url: `/articles/${id}`,
        //     method: 'put',
        //     params: { draft },
        //     data: this.publishForm
        //   }).then(() => {
        //     this.$message.success('编辑成功')
        //     this.$router.push('/home/artices')
        //   }).catch(() => {
        //     this.$message.error('编辑失败')
        //   })
        // } else {
        //   this.$axios({
        //     method: 'post',
        //     url: '/articles',
        //     params: { draft },
        //     data: this.publishForm
        //   }).then(() => {
        //     this.$message.success('发布成功')
        //     this.$router.push('/home/artices')
        //   }).catch(() => {
        //     this.$message.error('发布失败')
        //   })
        // }
      })
    }

  },
  created () {
    this.getChannels()
    // 判断是否存在 文章 id 如果存在获取对应的数据
    const { id } = this.$route.params
    // if (id) {
    //   // 获取文章的数据
    //   this.getArticleById(id)
    // }
    id && this.getArticleById(id)
  }
}
</script>

<style>

</style>
