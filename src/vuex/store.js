import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


//本地存储处理
const localEvent = function(item){
	this.get = function(){
		return JSON.parse(localStorage.getItem(item));
	}
	this.set = function(obj){
		localStorage.setItem(item,JSON.stringify(obj));
	}
	this.clear = function(){
		localStorage.removeItem(item);
	}
}

const local = new localEvent('vue_shelfbook');
var resetdata = {
	bkdetail:{
		"alt":"" ,
		"entitle" : "",
		"author" : "",
		"images" : {
			"large":"",
			"medium":"",
			"small":""
		},
		"isbn" :"",
		"pages" :"",
		"price" :"",
		"pubdate" :"",
		"publisher" :"",
		"title" :"",
		"subtitle" :"",
		"summary" :"",
		"endPage":0,
		"takeTimes":0,
		"isinshelf":false
	},
	books:[],
};
//初始化state
let state = local.get() || resetdata;
//true:书已入库
state["hasLocal"]=false;
//true:list编辑状态
state["isDirect"]=false;
state["selectedBooks"] = {};
state["isshelf"]=true;
state["start"]=false;

const mutations = {
	takeJson: function(state,json){
		state.bkdetail.alt = json.alt;
		state.bkdetail.entitle = json.alt_title;
		state.bkdetail.author = json.author;
		state.bkdetail.images = json.images;
		state.bkdetail.isbn = json.isbn13;
		state.bkdetail.pages = json.pages;
		state.bkdetail.price = json.price;
		state.bkdetail.pubdate = json.pubdate;
		state.bkdetail.publisher = json.publisher;
		state.bkdetail.title = json.title;
		state.bkdetail.subtitle = json.subtitle;
		state.bkdetail.summary = json.summary.trim();
		state.bkdetail.endPage=0,
		state.bkdetail.takeTimes=0,
		state.bkdetail.isinshelf= false;
	},
	// localEvent:function(){
	// 	var that = this;
	// 	this.$http.get("./data/detail.json").then(response=>{
	// 		var res = response.body;
	// 		console.log(res);
	// 		that.$store.commit('takeJson', res.result[0]);
	// 	})
	// }
	// 添加书籍
	addToLocal: function(state){
		state.bkdetail.isinshelf = true;
		const acti = JSON.parse(JSON.stringify(state.bkdetail));
		state.books.unshift(acti);
		local.set(state);
	},//以isbn检索
	searchIsbn: function(state,isbn){
		var id = isbn;
		var target = null;
		var books = state.books;
		for(var i=0;i<books.length;i++){
			for(var item in books[i]){
				if(item === "isbn" && books[i]["isbn"] == id){
					target = books[i];
				}
			}
		}
		if(!(target=== null)){
			//检索匹配，修改detail信息
			state.bkdetail = JSON.parse(JSON.stringify(target));
			state.hasLocal = true;
			return;
		}
		state.hasLocal = false;
	},
	updatebook: function(state){
		var book = state.bkdetail;
		var isbn = book.isbn;
		var time = book.takeTimes;
		var endpage = book.endPage;
		var pages = book.pages;
		for(var i=0;i<state.books.length;i++){
			for(var item in state.books[i]){
				if(item === "isbn" && state.books[i]["isbn"] == isbn){
					state.books[i]["endPage"] = endpage;
					state.books[i]["takeTimes"] = time;
					state.books[i]["pages"] = pages;
				}
			}
		}
		local.set(state);
	},
	//搜索框联动检索
	searchbook: function(state,keyarr){
		//本地books数据
		var books = local.get().books;
		//检索字段
		var key = keyarr[0];
		//检索框输入内容
		var keyword = keyarr[1];
		//检索框为空时取本地books
		if(keyword.trim().length == 0){
			state.books = books;
			return;
		}
		//keyword模糊匹配
		var reg = new RegExp(keyword);
		state.books = books.filter(book => {
			for(var item in book){
				if(item === key){
					return book[key].match(reg);	
				}

			}
		});
	},//删除所有图书
	deletelocalbook: function(state){
		state = resetdata;
		local.clear();
	},//改变编辑状态
	changeDirect: function(state){
		state.isDirect = !state.isDirect;
	},
	changeSelectedBooks: function(state,key){
		var isselected = key[1];
		var isbn = key[0]
		if(isselected){
			state.selectedBooks[isbn] = isbn;
		}else{
			state.selectedBooks[isbn] = undefined;
		}
		
	},
	deleteByIsbn: function(state){
		var bksdel = state.selectedBooks;
		var books = state.books;
		state.books = books.filter(book => {
			for(var item in book){
				if(item === "isbn"){
					for(var key in bksdel){
						if(bksdel[key] !== undefined && book[item] == bksdel[key]){
							return false;
						}

					}		
				}
			}
			return true;
		});
		state.selectedBooks = {};
		local.set(state);
	},
	changeisshelf: function(state){
		state.isshelf = !state.isshelf;
	},
	changestart: function(state){
		state.start = !state.start;
	},
	changereadmsg: function(state,key){
		state.bkdetail.takeTimes += key[0];
		state.bkdetail.endPage = key[1];
		state.bkdetail.pages = key[2];
	}
}


export default new Vuex.Store({
	state,
	mutations
})