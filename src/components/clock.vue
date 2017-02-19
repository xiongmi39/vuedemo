<template>
	<div class="clock">
		<div class="time">{{hour}}:{{minute}}:{{second}}</div>
		<div class="localBar inputdetail">
			已读：<input type="text" name="" v-model="readpages"> 页<span></span> 总页数：<input type="text" name="" v-model="totalpages">
		</div>
		<a @click="stoptime" class="btnlink">停止</a>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				hour: 0,
				minute:0,
				second:0,
				readpages:this.$store.state.bkdetail.endPage,
				totalpages:this.$store.state.bkdetail.pages,

			}
		},
		mounted: function(){
			this.$nextTick(function(){
				this.controlTime();
			})
		},
		methods:{
			controlTime: function(){
				var that = this;
				var startTime = setInterval(function(){
					if(that.$store.state.start == false){
						clearInterval(startTime);
					}
					if(that.second>=60){
						that.second = 0;
						that.minute ++;
					}
					if(that.minute>=60){
						that.minute = 0;
						that.hour ++;
					}
					that.second++;
				},1000);
			},
			stoptime: function(){
				this.$store.commit('changestart');
				var key = [];
				var minutes = 0;
				if(this.hour > 0){
					minutes += this.hour*60;
				}
				if(this.minute >0){
					minutes += this.minute;
				}
				if(this.minute > 0){
					key=[minutes,this.readpages,this.totalpages];
					this.$store.commit('changereadmsg', key);
					this.$store.commit('updatebook');
				}
			}
		}
	}
</script>
<style type="text/css">
	.clock{
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.5);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 90;
	}
	.time{
		margin: 40% auto 0 ;
		height: 100px;
		width: 150px;
		font-size: 2rem;
		color: #fff;
	}
	.inputdetail {
		margin: 10% auto;
		height: 20px;
		width: 200px;
	}
	.inputdetail input{
		width: 20px;
	}
</style>