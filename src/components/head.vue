<template>
	<div>
		<div class="header-bar">
			<router-link to="/readdata" class="iconlink dataicon"></router-link>
<!-- 			<nv-search></nv-search> -->
		<nv-direct></nv-direct>
		</div>

	</div>
</template>
<script>
import nvDirect from './direct.vue';
	export default {
		data(){
			return {
				
			}
		},
		components:{
			nvDirect,
		}
	}
</script>
<style type="text/css">
	.header-bar{
	height: 50px;
	width: 100%;
	background: #9B9C70;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
}
.dataicon{
	background: url('/src/assets/images/Chart-5.png') no-repeat top left;
	background-size: 80%;
	margin: 5px 10px;

}
</style>