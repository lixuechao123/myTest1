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
					<tr>
					<td class='scroll-view-item_H'>项目名项目名</td>
					<td class='scroll-view-item_H'>2020-10-10 10:10</td>
					<td class='scroll-view-item_H'>2020-10-10 10:10</td>
					<td class='scroll-view-item_H'>是</td>
					<td class='scroll-view-item_H'>备注</td>
					</tr>
					<tr  v-for="(item,index) in xiangmu_list" :key='index'>
						<td>{{index}}</td>
					<!-- <td class='scroll-view-item_H'>{{item.name}}</td>
					<td class='scroll-view-item_H'>{{item.beginTime}}</td>
					<td class='scroll-view-item_H'>{{item.endTime}}</td>
					<td class='scroll-view-item_H'>{{item.isOver}}</td>
					<td class='scroll-view-item_H'>{{item.note}}</td>	 -->
					</tr>
					
					
					
				</table>
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			xiangmu_list:[]
		},
		onLoad() {
		
		},
		onShow(){
			console.log('loglog')
				this.get();
				
			console.log("onloud:"+JSON.stringify(this.xiangmu_list))
		},
			methods: {
				get() {
					//当前页面的vue实例
					var vm=this;
					uni.showLoading({
						title: '处理中...'
					})
					uniCloud.callFunction({
						name: 'get',
						data:{"table":"xiangmu"}
					}).then((res) => {
						uni.hideLoading()
						//将返回 值赋值给变量
						vm.xiangmu_list=res.result.data;
						// uni.showModal({
						// 	content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`,
						// 	showCancel: false
						// })
						console.log("get返回值"+JSON.stringify(vm.xiangmu_list))
						
					}).catch((err) => {
						uni.hideLoading()
						uni.showModal({
							content: `查询失败，错误信息为：${err.message}`,
							showCancel: false
						})
						console.error(err)
					})
				},
				
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
	
	padding: 10px 10px;	
		
		text-align: center;
		font-size: 20rpx;
	}
	
</style>
