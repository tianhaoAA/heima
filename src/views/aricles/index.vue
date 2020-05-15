<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 搜索工具栏 筛选 -->
    <el-form style="padding-left:60px;">
      <el-form-item label="文章状态:">
        <!--  0 -草稿 1 -待审核 2-审核通过 3 审核失败 4 -以删除 不传为全部  先将 5定义为全部 -->
        <el-radio-group v-model="searchFrom.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章频道:">
        <el-select placeholder="请选择频道" v-model="searchFrom.channel_id">
          <!-- el-option 是下拉的选项 label 是显示值 value 是绑定值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围:">
        <!-- 时间选择组件  type-->
        <el-date-picker type="daterange" v-model="searchFrom.value1"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 文章的主题结构 -->
    <el-row type="flex" class="footer" align="middle">
      <span>共找到1000条符合的内容</span>
    </el-row>
    <div class="articles-item" v-for="item in list" :key="item.id.toString()">
      <div class="left">
        <!-- 设置文章的封面信息 有的数组有值 有的没有值 没有值得情况下本地默认有一个图片 -->
        <img :src=" item.cover.images.lenght? item.cover.images[0]:defaultImg" alt />
        <div class="info">
          <span>{{ item.title }}</span>
         <el-tag  :type="item.status | filterType" class="tag"> {{ item.status | filterStatus }} </el-tag>
          <span class="date">{{ item.pubdate }}</span>
        </div>
      </div>
      <div class="right">
        <span>
          <i class="el-icon-edit"></i>修改
        </span>
        <span>
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchFrom: {
        //   文章 状态
        // 0 -草稿 1 -待审核 2-审核通过 3 审核失败 4 -以删除 不传为全部  先将 5定义为全部
        status: 5,
        //
        channel_id: null,
        value1: []
      },
      //   专门接受频道数据
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/11.jpg')
    }
  },
  methods: {
    //   获取文章列表
    getArticles () {
      this.$axios({
        url: '/articles'

      }).then((res) => {
        this.list = res.data.results
      })
    },
    getAndChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getAndChannels()
    this.getArticles()
  },
  // 专门处理显示格式的
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '以发表'
        case 3:
          return '审核失败'
      }
    },
    // 根据当前状态的值 显示不同类型的tag 类型
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.articles {
  .footer {
    height: 60px;
    border-bottom: 1px solid red;
  }
  .articles-item {
    display: flex;
    // justify-content: space-around;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #cccccc;
    .left {
        display: flex;
        img {
          width: 180px;
          height: 90px;
          border-radius: 5px;
        }
        .info{
           display: flex;
            flex-direction: column;
            height: 100px;
            justify-content: space-around;
            margin-left: 10px;
            .data {
                color: #999;
                font-size: 12px;
            }
            .tag {
                width: 60px;
                text-align: center;
            }

        }
    }
    .right {
        font-size: 14px;
        margin-right: 8px;
        cursor: pointer;
        user-select: none;

    }
  }
}
</style>
