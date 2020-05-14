<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click='changTab'>
      <!-- 放置标签 label 表示标签字段名字 -->
      <el-tab-pane label="全部素材" name="all">
        <div class="image-item">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <!-- 放置图片  -->
            <img :src="item.url" alt />
            <el-row class="aixin" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-off"></i>
              <i class="el-icon-delete"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
       <div class="image-item">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <!-- 放置图片  -->
            <img :src="item.url" alt />

          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 当前选中的标签
      activeName: 'all',
      // 接收素材数据
      list: []
    }
  },
  methods: {
    changTab () {
      // 根据当前的activeName 来决定是获取那个方面的 数据
      this.getAndMaterial()
    },
    getAndMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.list = res.data.results
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
