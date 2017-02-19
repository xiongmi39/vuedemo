<template>
<transition name="detail-fade">
	<div >
	<a v-if="!this.$store.state.bkdetail.isinshelf" class="btnlink" @click="addtoShelf">入库</a>
	<a v-if="this.$store.state.bkdetail.isinshelf" @click="changestart" class="btnlink">开始读书计时</a>
<!-- 	<button class="addbtn" @click="addtoShelf">+</button> -->
	<nv-detail></nv-detail>
	<nv-clock v-if="this.$store.state.start"></nv-clock>
	</div>
</transition>
</template>
<script>
	export default {
		replace:true,
		props:{

		},
		data(){
			return{
			}
		},
		mounted(){

		},
		components:{
			"nvDetail":require('../components/bookdetail.vue'),
			"nvClock":require('../components/clock.vue'),
		},
		methods:{
			addtoShelf: function(){
				this.$store.commit('addToLocal');
				this.$store.commit('changeisshelf');
				this.$router.replace("/");
			},
			changestart: function(){
				this.$store.commit('changestart');
			}
		},

	}
</script>
<style type="text/css">
	.addbtn{
		position: fixed;
		top: 20px;
		height: 40px;
		width: 40px;
		font-size: 2rem;
		border-radius: 50%;
		border: none;
	}
</style>
