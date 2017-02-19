<template>
	<span class="iconlink direct" @click="deletebooks">{{directtext}}</span>
</template>
<script>
	export default {
		data (){
			return {
				directtext:"编辑",
			}
		},
		methods:{
			deletebooks: function(){
				this.$store.commit('changeDirect');
				if(this.directtext == "编辑"){
					this.directtext = "完成";
				}else{
					this.directtext = "编辑"
				}
			}
		}
	}
</script>
<style type="text/css">
	.direct{
		height: 20px;
	margin: auto 10px auto auto;
	padding-top: 0px;
		font-size: 1rem;
	}
</style>