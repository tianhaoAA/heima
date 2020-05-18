<template>
<div>
    <div class="cover-images">
        <div @click="openDialog(index)" v-for='(item,index) in list' :key="index" class="cover-images-item">
            <img :src="item?item:defaulImg" alt=""><span>{{index}}</span>
        </div>
    </div>
    <!-- 采用element-ui 的弹层组件 -->
    <el-dialog :visible="dialogVisible" @close='dialogVisible=false'>
          <select-images @chlickImg='chlickImg1'></select-images>
    </el-dialog>
</div>
</template>

<script>
export default {
  // 接受父组件传值
  props: ['list'],
  data () {
    return {
      defaulImg: require('../../assets/img/pic_bg.png'),
      //   控制弹层的显示或者隐藏
      dialogVisible: false,
      selectIndex: -2
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    chlickImg1 (url) {
      this.$emit('chlickImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-images {
   display: flex;
   margin: 20px 100px;
   .cover-images-item {
       border:1px solid #cccccc;
       width: 250px;
       height: 250px;
       padding: 20px;
       img {
         width: 100%;
         height: 100%;
       }
   }
}

</style>
