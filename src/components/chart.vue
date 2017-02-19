<template>
<div class="chart">
	<highcharts :options="options" ref="highcharts"></highcharts>
<!-- 	<div class="btngroup"><a class="oneweek btnlink">过去一周</a><a class="oneyear btnlink" @click="showlastyear">过去一年</a></div> -->
<!-- 	  <button @click="updateCredits">update credits</button> -->
	  </div>
</template>
<script>
	export default {
		data(){
			return {
				// bymonth:{
				// 	categories: ['一月', '二月', '三月', '四月', '五月', '六月','七月','八月','九月','十月','十一月','十二月'
				// 	],
				// 	yAxis: {
				// 		title: {
				// 			text: '阅读时间(小时)'
				// 		},
				// 		plotLines: [{
				// 			value: 0,
				// 			width: 1,
				// 			color: '#808080'
				// 		}]
				// 	},
				// 	tooltip: {
				// 		valueSuffix: '分钟'
				// 	},
				// 	series: [{
				// 		name: '一年',
				// 		data:[60, 20, 50, 180, 360, 110, 60,60, 20, 50, 180, 360, 110, 60]
				// 	}]
				// },
				options : {
					title: {
						text: '平均阅读时间统计',
    					x: -20 //center
					},
				subtitle: {
					text: 'Source: WorldClimate.com',
					x: -20
				},
				xAxis: {
					categories: ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'
					]
				},
				yAxis: {
					title: {
						text: '阅读时间(分钟)'
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				},
				tooltip: {
					valueSuffix: '分钟'
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: [{
					name: '一周',
					data: [60, 20, 50, 180, 360, 110, 60]
				},
				{
					name: '一年',
					data:[500, 600, 600, 180, 360, 110, 60,60, 20, 50, 180, 360, 110, 60]
				}]
			}
}
},
methods: {
	updateCredits: function() {
		var chart = this.$refs.highcharts.chart;
		chart.credits.update({
			style: {
				color: '#' + (Math.random() * 0xffffff | 0).toString(16)
			}
		});
	},
	// showlastyear: function(){
	// 	this.options.categories = this.bymonth.categories;
	// 	this.options.yAxis = this.bymonth.yAxis;
	// 	this.options.tooltip = this.bymonth.tooltip;
	// 	this.options.series = this.bymonth.series;
	// }
}
}
</script>
<style type="text/css">
	.chart{
		margin-top: 50px;
	}
</style>