<template>
	<div class="searchBar">
		<input type="text" class="isbntext" name="" v-model="isbn" @input="filterBooks" @change="filterBooks"/>
		<span class="searchcamera ">
		<input  type="file" accept="image/*" capture="camera" @change="changetoISBN"/>
		</span>
	</div>
</template>
<script>
	export default{
		data (){
			return {
				url: `https://api.douban.com/v2/book/isbn/`,
				isbn:"",
				state: {
					inputStream: {
						size: 800,
						singleChannel: false
					},
					locator: {
						patchSize: "medium",
						halfSample: true
					},
					decoder: {
						readers: [{
							format: "ean_reader",
							config: {}
						}]
					},
					locate: true,
					src: ""
				},
				newBook:{

				}
			}
		},
		mounted: function(){

		},
		filters:{
			
		},
		methods:{
			changetoISBN: function(el){
				var src= URL.createObjectURL(el.target.files[0]);
				this.state.src= src;
				var self = this;
				Quagga.decodeSingle(this.state, function(result){
					if(result.codeResult){
						self.isbn = result.codeResult.code;
						// self.searchLocal();
						self.searchDouban();
					}else{
						alert("无法识别，请重新拍摄");
					}
				});
				this.state.src = "";

			},
			searchISBN: function(el){
				if(!this.isbn){
					el.target.parentNode.children[0].focus();
				}

			},
			searchLocal: function(){

			},
			searchDouban: function(){
				if(!this.isbn){
					return ;
				}
				var url = this.url+this.isbn;
				this.$http.jsonp(url).then(response=>{
					var res = response.body;
					this.handlebook(res);
					this.turntoDetail();
				});
			},
			handlebook(res){
				this.$store.commit('takeJson', res);
			},
			turntoDetail: function(){
				this.$router.replace("/detail");
			},
			filterBooks: function(el){
				var keyword = el.target.value;
				var key = ["title",keyword];
				this.$store.commit('searchbook', key);
				this.refreshPage();
			},
			refreshPage: function(){
				this.$router.replace("/");
			}
		}
	}
</script>
<style type="text/css">
	.searchBar{
		display: flex;
		width: 100%;
		margin: 10px;
		height: 30px;
/*		background: #9B9C70;*/
	}
	.isbntext:focus{
		border: 1px solid #9B9C70;
		outline: none;
	}
	.isbntext {
		width: 80%;
		border-radius: 10px;
		background-color: #eee;
		border: #eee;
	}
	.searchcamera{
		margin: 5px 5px;
		width: 30px;
		height: 30px;
		background: url('/src/assets/images/camera-s.png') no-repeat top center;
	background-size: 70%;
	}
	.searchcamera input {
		opacity: 0;
		width: 10px;
	}
</style>