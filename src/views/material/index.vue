<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 放置一个上传的组件 -->
    <!-- 上传组件要求必须 传action 属性 不传就会报错 -->
    <el-row type="flex" justify="end">
      <el-upload :show-file-list="false" :http-request="uploadImg" action="">
      <!--上传素材  -->
      <el-button type="primary">上传素材</el-button>
    </el-upload>
    </el-row>

    <el-tabs v-model="activeName" @tab-click='changTab'>
      <!-- 放置标签 label 表示标签字段名字 -->
      <el-tab-pane label="全部素材" name="all">
        <div class="image-item">
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <!-- 放置图片  -->
            <img :src="item.url" alt   @click="slectImg(index)"/>
            <el-row class="aixin" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-off" :style="{ color:item.is_collected?'red':'black'}" @click="shoucanImg(item)"></i>
              <i class="el-icon-delete" @click="delImg(item)"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
       <div class="image-item">
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <!-- 放置图片  -->
            <img :src="item.url" alt  @click="slectImg(index)"/>

          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 放置一个公共的分页组件 -->
    <el-row type="flex" justify="center" style="height:80%" align="middle">
     <!-- 放置分页组件 -->
     <!-- total 总条数
      current-page 当前页码
      page-size 每页多少条
       -->
     <el-pagination background
      :total="page.total"
      :current-page="page.currentaPage"
      :page-size="page.pageSize"
      layout="prev, pager,next"
     @current-change='changePage'
    ></el-pagination>
    </el-row>
    <!-- 放置 一个el-dialog组件 通过visible 属性进行true false设置
     -->
     <el-dialog   @opened='openedEnd'  :visible='dialogVisible' @close='dialogVisible=false'>
       <!-- 放置走马灯组件 -->
       <el-carousel  ref="myCarousel" indicator-position="outside" height="500">
         <!-- 放置循环项 -->
         <el-carousel-item  v-for="item in list" :key="item.id">
           <img style="width:100%;height:100%" :src="item.url" alt="">
         </el-carousel-item>
       </el-carousel>
     </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 当前选中的标签
      activeName: 'all',
      // 接收素材数据
      list: [],
      page: {
        // 当前的页面
        currentaPage: 1,
        // 当前的总数
        total: 0,
        // 每页多少条
        pageSize: 4
      },
      dialogVisible: false,
      clickTndex: -1
    }
  },
  methods: {
    // opened
    openedEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickTndex)
    },
    // 点击 图片调用
    slectImg (index) {
      this.clickTndex = index

      this.dialogVisible = true
    },
    // 点击删除
    delImg (row) {
      this.$confirm('您是否要删除图片吗?', '提示').then(() => {
        // 调用删除接口
        this.$axios({
          url: `/user/images/${row.id}`,
          method: 'delete'
        }).then((res) => {
          this.getAndMaterial()
          this.$message.success('操作成功')
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    },
    // 点击收藏取消收藏图片
    shoucanImg (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      }).then((res) => {
        this.getAndMaterial()
        this.$message.success('操作成功')
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 上传图片素材
    uploadImg (params) {
      // params.file 就是需要 上传的图片文件
      // 接口参数 类型要求是 formDate
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then((res) => {
        this.getAndMaterial()
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    // 在页面切换时
    changePage (newPage) {
      this.page.currentaPage = newPage
      this.getAndMaterial()
    },
    changTab () {
      this.page.currentaPage = 1
      // 根据当前的activeName 来决定是获取那个方面的 数据
      this.getAndMaterial()
    },
    getAndMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          //
          page: this.page.currentaPage,
          // 获取每页数量
          per_page: this.page.pageSize

        }
      }).then(res => {
        this.list = res.data.results
        // 将总条数
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAndMaterial()
  }
}
</script>

<style lang='less' scoped>
.image-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    position: relative;
    width: 220px;
    height: 200px;
    margin: 20px 30px;
    img {
      width: 100%;
      height: 100%;
    }
    .aixin {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #f4f6f6;
      height: 30px;
    }
    .shanchu {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      background-color: #f4f6f6;
      height: 30px;
      font-size: 30px;
    }
  }
}
</style>
