<template>
<div>
<!-- <button @click="clearbook">clear</button> -->
	<ul class="nvlist">
		<li v-for="book in this.$store.state.books" @click="toDetail(book.isbn)">
				<div class="dircover" v-if="that.$store.state.isDirect" v-bind:class="{'chk':book.checked}" v-on:click.stop="selectedBook(book)"></div>
		<div><img v-bind:src="book.images.small" v-bind:alt="book.title"></div>

		<div class="detail">
			<div class="title">{{book.title}}</div>
			<div class="pages">({{book.endPage}}/{{book.pages}})</div>
			<a class="start" @click="startToRead(book)"></a>
		</div>	
		</li>
	</ul>
	</div>
</template>

<script>
	export default{
		data (){
			return {
				bookList:this.$store.state.books,
				that: this,
			}
		},
		mounted: function(){
			this.$nextTick(function(){
				// var _this = this;
				// _this.readLocalData();
			})
		},
		filters:{

		},
		methods:{
			// readLocalData: function(){
			// 	this.$http.get("./data/localbook.json").then(response=>{
			// 		var res = response.body;
			// 		this.bookList = res.result;
			// 	});
			// },
			startToRead: function(book){

			},
			toDetail: function(isbn){
			var hasdetail=	this.$store.commit('searchIsbn', isbn);
			this.$store.commit('changeisshelf');
				this.$router.replace("/detail");

			},
			clearbook: function(){
				this.$store.commit('deletelocalbook');
			},
			selectedBook: function(book){
				if(typeof book.checked == "undefined"){
					this.$set(book,"checked",true);
				}else{
					book.checked = !book.checked;
				}
				var key = [book.isbn,true];
				if(book.checked == true){
					this.$store.commit('changeSelectedBooks',key);
				}else{
					key[1] = false
					this.$store.commit('changeSelectedBooks',key);
				}
			}
		}
	}
</script>

<style type="text/css">
body{
	background-color: #E1DEDF;
}
	.nvlist {
		margin: 10px 10%;
		width: 90%;
		margin-bottom: 60px;
	}
	.nvlist li {
		margin: 10px;
		width: 100%;
		display: flex;
		position: relative;

	}

	img {
		border: 1px solid #eee;
		flex:1;
	}
	.detail{
		padding-top: 10px;
		flex: 3;
	}
</style>