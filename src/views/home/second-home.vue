<template>
<div class="second-home">
  <div ref="myEchart" class="echarts"></div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    // 进行echarts 图标的实例化
    this.mychart = echarts.init(this.$refs.myEchart)
    this.mychart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
    )
  }
}
</script>

<style>
 .second-home {
   /* height: 88.7vh; */
   height:  calc( 100vh - 60px );
   background-size: cover;
   background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589375392501&di=3ac0f8963d8221f5fd7c5c198140a286&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1301%2F08%2Fc1%2F17228898_1357627460092.jpg');
 }
 .echarts {
width: 600px;
height: 400px;
background-color: pink;
 }
</style>
