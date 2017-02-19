<template>
<div class="bkdetail">
	<div class="up">
		<img v-bind:src="this.$store.state.bkdetail.images.medium">
		<div class="publish">
<!-- 			<p>{{this.$store.state.bkdetail.title}}-{{this.$store.state.bkdetail.subtitle}}</p> -->
			<p>书名：{{this.$store.state.bkdetail.title}}</p>
			<p>作者：{{this.$store.state.bkdetail.author}}</p>
			<p>出版社：{{this.$store.state.bkdetail.publisher}}</p>
			<p>出版年：{{this.$store.state.bkdetail.pubdate}}</p>
			<p>页数：{{this.$store.state.bkdetail.pages}}</p>
			<p>定价：{{this.$store.state.bkdetail.price}}</p>
			<p></p>
		</div>

	</div>
	<div class="localBar display" v-if="!this.$store.state.isDirect">
		<span>阅读时间：{{Math.floor(this.$store.state.bkdetail.takeTimes/60)}}小时{{this.$store.state.bkdetail.takeTimes%60}}分钟</span><span>已读：{{this.$store.state.bkdetail.endPage}}页</span><span>总页数：{{this.$store.state.bkdetail.pages}}</span>
	</div>

	<div class="about">
		{{this.$store.state.bkdetail.summary}}
	</div>
</div>
</template>
<script>
	export default{
		data(){
			return {
				detail: this.$store.state.bkdetail
			}
		},
		mounted: function(){
			this.$nextTick(function(){
				// this.setDetail();
			})
		},
		filters:{

		},
		methods:{
			setDetail: function(){
				var that = this;
				this.$http.get("./data/detail.json").then(response=>{
					var res = response.body;
					that.$store.commit('takeJson', res.result[0]);
				});
			}
		}
	}
</script>
<style type="text/css">
.bkdetail{
	width: 90%;
	margin: -10px 10%;
	padding-top: 50px;

}
	.up {
		width: 100%;

		display: flex;
	}
	img{
		flex:1;
	}
	.publish{
		flex: 3;
	}
	.about{
		margin: 10px 10px;
		width: 90%;
		font-size: 0.8rem;
		text-align: left;
		line-height: 1.5;
	}
	p{
		text-align: left;
		font-size: 0.6rem;
		margin: 10px 10px;
	}
	.localBar{
		text-align: left;
		width: 100%;
		font-size: 0.6rem;
		color: #E2574C;
	}
	.localBar span{
		text-align: left;
		margin: 10px 10px;
		display: inline-block;
	}

</style>