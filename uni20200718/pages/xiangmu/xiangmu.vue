<template>
	<view class="content">
	
		
		
		<view class="p1">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<table>
					<tr>
						<th class='scroll-view-item_H'>项目名</th>
						<th class='scroll-view-item_H'>项目开始时间</th>
						<th class='scroll-view-item_H'>项目结束时间</th>
						<th class='scroll-view-item_H'>是否结束</th>
						<th class='scroll-view-item_H'>备注</th>
					</tr>
					
					<tr  v-for="(item,index) in xiangmu_list" :key='index'>
						
					<td class='scroll-view-item_H'>{{item.name}}</td>
					<td class='scroll-view-item_H'>{{item.beginTime}}</td>
					<td class='scroll-view-item_H'>{{item.endTime}}</td>
					<td class='scroll-view-item_H'>{{item.isOver}}</td>
					<td class='scroll-view-item_H'>{{item.note}}</td>	
					</tr>

										
					
					
				</table>
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {

			return{
				xiangmu_list:[],//当前页的列表对象集合
				page_size:5,//没页的记录数量，
				current_page:1,//当前的页码
				total_page:10//页面总数
			}
			
		},
		onLoad() {
			
			var vm=this;		
				vm.get_total_page();				
			 // setTimeout(function () {
			 //            console.log('start pulldown');
			 //        }, 1000);
			 //        uni.startPullDownRefresh();
		},
		onReachBottom() {//上滑触底事件
			var vm=this;		
			
			//如果页面的当前页码小于最大页码，可以累加
			if(vm.current_page<vm.total_page){
				vm.current_page++;
				vm.get();
			}
			console.log('上滑后的页码是：'+vm.current_page)
		},
		onPullDownRefresh() {//下拉事件
			var vm=this;
			
			//1秒后关闭下拉样式
			 setTimeout(function () {
			            uni.stopPullDownRefresh();
					
			        }, 1000);
					//如果当前页码>1,可以累减
					if(vm.current_page>1){
						vm.current_page--
						vm.get();
					}
					console.log('下拉后的页码是'+vm.current_page)

			xiangmu_list:[]
		},
		
			methods: {
				get_total_page(){
					//当前页面的vue实例
					var vm=this;
					uni.showLoading({
						title: '处理中...'
					
					})
					uniCloud.callFunction({
						name: 'get_total_page',
						//传入的参数有表名，当前页码，每页记录的数量
						data:{
							"table":"test2",
						"page_size":vm.page_size
						}
					}).then((res) => {
						//uni.hideLoading()
						//将返回 值赋值给变量
						vm.total_page=res.result;
						console.log("总的页数："+vm.total_page);
						//获取分页内容
						vm.get_content();
						
					}).catch((err) => {
						uni.hideLoading()
						uni.showModal({
							content: `查询失败，错误信息为：${err.message}`,
							showCancel: false
						})
						console.error(err)
					})
				},
				get_content() {
					//当前页面的vue实例
					var vm=this;
					// uni.showLoading({
					// 	title: '处理中...'

					// })
					uniCloud.callFunction({
						name: 'get_content',
						//传入的参数有表名，当前页码，每页记录的数量
						data:{
							"table":"test2",
						"current_page":vm.current_page,
						"page_size":vm.page_size
						}
					}).then((res) => {
						uni.hideLoading()
						//将返回 值赋值给变量
						vm.xiangmu_list=res.result.data;
						console.log("返回的分页内容："+JSON.stringify(res))
					}).catch((err) => {
						uni.hideLoading()
						uni.showModal({
							content: `查询失败，错误信息为：${err.message}`,
							showCancel: false
						})
						console.error(err)
					})

					}
				
				},
				
			
		}
</script>

<style>
	.content {
		padding-bottom: 30px;
	}
.p1{
	background-color:#F1F1F1;
}
	

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	

	.scroll-view-item_H {
	height: 100px;
	padding: 10px 10px;	
		
		text-align: center;
		font-size: 20rpx;
	}
	
</style>
