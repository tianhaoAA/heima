<template>
 <div>
<el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="select-image-list">
          <el-card  class="img-card" v-for="item in list " :key="item.id">
             <img :src="item.url" @click="chlickImg(item.url)" alt="">
          </el-card>
      </div>
      <!-- 分页 -->
      <el-row type="felx" justify="center" style='height:80px;' align="middle">
        <el-pagination background
      :total="page.total"
      :current-page="page.currentaPage"
      :page-size="page.pageSize"
      layout="prev, pager,next"
     @current-change='changePage'
    ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">
      <el-upload action="" class="upload-img" :http-request="uplodImg">
        <i class='el-icon-plus'> </i>
      </el-upload>
    </el-tab-pane>

  </el-tabs>
 </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        total: 0,
        currentaPage: 1,
        pageSize: 6

      }
    }
  },
  methods: {
    // 上传素材
    uplodImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then((res) => {
        this.$emit('chlickImg', res.data.url)
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    //   点击图片时触发
    chlickImg (url) {
      this.$emit('chlickImg', url)
    },
    //   改变页面
    changePage (newPage) {
      this.page.currentaPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          // 查询全部的素材
          collect: false,
          page: this.page.currentaPage,
          // 获取每页数量
          per_page: this.page.pageSize
        }
      }).then((res) => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },

  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' secped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
     justify-content: space-around;
    .img-card{
        width: 150px;
        height: 100px;
        margin: 20px 0;

        img {
            width: 100%;
            height: 100%;
        }
    }

}
   .upload-img {
    display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
    }
</style>
