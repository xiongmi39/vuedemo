<template>
<div>
	<div>累计阅读时间：  小时</div>
	<nv-chart></nv-chart>
<!-- 	<a class="shareicon" href="http://service.weibo.com/share/share.php?appkey=&title=&url=&searchPic=false&style=simple" target="_blank"><img src="/src/assets/images/weibo.png" alt="wechat"> 分享到微博</a> -->
</div>
</template>
<script>
	export default{
		data (){
			return {

			}
		},
		components:{
			"nvChart":require('../components/chart.vue'),
		}
	}
</script>
<style type="text/css">
	.shareicon img{
		height: 20px;
		width: 20px;

	}
</style>