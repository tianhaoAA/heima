<template>
<el-card>
  <bread-crumb slot="header">
   <template slot="title">评论管理</template>
  </bread-crumb>

<el-table :data='list'>
  <!-- prop 表示显示的字段 label表示表头 -->
  <el-table-column  prop="title" width="500" label="标题"></el-table-column>
  <el-table-column  prop="comment_status" label="评论状态"></el-table-column>
  <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
  <el-table-column  prop="fans_comment_count" label="粉丝评论数"></el-table-column>
  <el-table-column  label="操作"></el-table-column>
</el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [

      ]
    }
  },
  methods: {
  // 获取评论数据的方法
    getAndComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }

      }).then((res) => {
        console.log(res)

        this.list = res.data.results
      })
    }
  },
  created () {
    this.getAndComment()
  }

}
</script>

<style>

</style>
