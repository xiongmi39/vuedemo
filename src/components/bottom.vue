<template>
	<div>
		<div class="bottom-bar">
			<router-link to="/" class="iconlink bookshelf " v-bind:class="{'active':this.$store.state.isshelf}"><span  @click="changeactive">书架</span></router-link>
			<nv-add class="cameraicon"></nv-add>
			<router-link to="/detail" class="iconlink book" v-bind:class="{'active':!this.$store.state.isshelf}"><span  @click="changeactive">详细</span></router-link>
		</div>
		<div class="directbar" v-if="this.$store.state.isDirect">
			<a class="btnlink" @click="delbooks">删除</a>
		</div>
	</div>
</template>
<script>
import nvAdd from './add.vue';

	export default {
		data(){
			return {
				isactive:true,
			}
		},
		methods: {
			delbooks: function(){
				this.$store.commit('deleteByIsbn');
			},
			changeactive: function(){
				this.$store.commit('changeisshelf');
			}
		},
		components:{
			nvAdd,
		}
	}
</script>
<style type="text/css">
	.bottom-bar{
	height: 50px;
	width: 100%;
	background: #9B9C70;
/*	background-color: #a39c9d;*/
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	z-index: 10;
}
	.directbar{
	height: 50px;
	width: 100%;
	background: #9B9C70;
/*	background-color: #a39c9d;*/
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	z-index: 10;
}


.cameraicon{
  position: fixed;
  bottom:-40px;
  left: 25%;
}
.bookshelf{
	background: url('/src/assets/images/bookshelf.png') no-repeat;
	background-size: 70%;
	background-position: center 2px;
	border-top: 3px solid #9B9C70;
}
.book{
	background: url('/src/assets/images/book.png') no-repeat top center;
	background-size: 70%;
	background-position: center 2px;
	border-top: 3px solid #9B9C70;
}

/*.active{
	border-top: 3px solid #E2574C;
}*/

</style>