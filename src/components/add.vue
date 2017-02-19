<template>
	<div class="addBtn iconlink">
		<input  type="file" accept="image/*" capture="camera" @change="changetoISBN"/>
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
		methods:{//照片转换ISBN
			changetoISBN: function(el){
				var src= URL.createObjectURL(el.target.files[0]);
				this.state.src= src;
				var self = this;
				Quagga.decodeSingle(this.state, function(result){
					if(result.codeResult){
						self.isbn = result.codeResult.code;
						self.searchLocal();
						if(self.$store.state.hasLocal == false){
							//未入库，请求豆瓣
							self.searchDouban();
						}else{
							//已入库，转到详细页面
							self.turntoDetail();
						}


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

			},//搜索图书是否已入库
			searchLocal: function(){
				var self = this;
				this.$store.commit('searchIsbn', self.isbn);
			},//请求豆瓣
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
				this.$store.commit('changeisshelf');
				this.$router.replace("/detail");
			}
		}
	}
</script>
<style type="text/css">

	.addBtn input{
		width: 100%;
		opacity: 0;
	}
</style>