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
        <!-- 显示值和存储值得机构不一样 使用 value-format指定绑定值的格式 -->
        <el-date-picker value-format="yyyy-MM-dd"  type="daterange" v-model="searchFrom.value1"></el-date-picker>
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
        <span  @click="delMaterial(item.id.toString())">
          <!-- 需要传递参数 传递要删除的id id 有可能是大数字类型 -->
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <el-row type="flex" justify="center" style="height:80px" align="middle">
         <el-pagination background layout="prev,pager,next"
         :current-page="page.currentPage"
         :page-size="page.pageSize"
         :total="page.total"
         @current-change='currentChang'>
         </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        // 当前页面
        currentPage: 1,
        // 接口要求每页 10-50条
        pageSize: 10,
        //  总条数
        total: 0
      },
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
  // 监听data中的数据 变化
  watch: {
    searchFrom: {
      // 固定写法 表示会深度检测searchfrom中数据变化
      deep: true,
      handler () {
        this.changComditon()
        this.page.currentPage = 1
      }
    }
  },
  methods: {
    // 删除文章
    delMaterial (id) {
      this.$confirm('您确定要删除此条数据', '提示').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then((res) => {
        // 应该带着条件 和页面加载数据
          this.changComditon()
        }).catch(() => {
          this.$message.error('删除文章失败')
        })
      })
    },
    // 分页插件 当页面改变的时候触发
    currentChang (newPage) {
      console.log(newPage)
      console.log(1)

      this.page.currentPage = newPage
      this.changComditon()
    },
    // 当前频道放生改变的时候

    // 改变的条件
    changComditon () {
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchFrom.status === 5 ? null : this.searchFrom.status,
        channel_id: this.searchFrom.channel_id,
        begin_pubdate: this.searchFrom.value1 && this.searchFrom.value1.length ? this.searchFrom.value1[0] : null,
        end_pubdate: this.searchFrom.value1 && this.searchFrom.value1.length > 1 ? this.searchFrom.value1[1] : null
      }
      this.getArticles(params)
    },
    //   获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params

      }).then((res) => {
        this.list = res.data.results
        this.page.total = res.data.total_count
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
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 根据当前状态的值 显示不同类型的tag 类型
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning' // 草稿的时候 警告
        case 1:
          return 'info' // 待审核
        case 2 :
          return '' // 已发表
        case 3:
          return 'danger' // 失败 错误
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
