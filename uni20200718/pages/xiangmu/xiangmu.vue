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
					<view  v-for="(item,index) in newsList" :key='index' class="newslist">
						<view class="uni-list-cell">
							
							<view class="left1">
								<!-- <view class="nicheng">{{item.Nickname}}</view>
								<view class='riqi'>{{format(item.Income_Date)}}</view> -->
								<text>{{forma(item.Income_Date)}}</text><br/>
								<text>收入类型： {{shouruType(item.Income_Type) }}</text><br/>
								<text>收入来源：
								<text v-if='item.Income_Type=="2"' >
								<text v-text="item.Xx_Nicname==null?'':item.Xx_Nicname"></text>
								</text>
								<text v-if='item.Income_Type=="1"' >自己</text>
								</text>
								
								
							</view>	
							<view class="itemRight">
								+<text>{{item.Income_Money}}</text>
							</view>
							
						</view>	
					</view>
					<!--3使用组件 -->
					<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
				</table>
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	//1引入组件 uni-load-more.vue
	import uniLoadMore from '@/components/uni-load-more.vue';	
	var _self,vm=this,
					page0 = 1,
					page1=1,
					pageSize=8,
					timer = null;					
			// 定义全局参数,控制数据加载
	export default {
		data() {
			pageSize:pageSize,//默认记录数量，
												 pageTotal:0,//总的页码数
			tabList: [{ name: '收入记录' }, { name: '提现记录' }],
			
			 newsList: [
											  							   
			 ],
			 newsList1: [
			 								  							   
			 ],
			
			        loadingText: '加载中...',
			        loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
			        contentText: {
			            contentdown:'上拉显示更多',
			            contentrefresh: '正在加载...',
			            contentnomore: '没有更多数据了'
			        }
		},
		,
		 components: {	
			 
				//刷新组件
			 uniLoadMore
			  
			  },
			  onLoad() {
			  	
			  	 _self = this;
			  				//页面一加载时请求一次数据
			  	        this.getnewsList();
			  	
			  
			  },
			  onPullDownRefresh: function() {
			  				//下拉刷新的时候请求一次数据
			          this.getnewsList();
			  		console.log('下下下')
			  		
			      },
			      onReachBottom: function() {
			  		console.log('上上上')
			  			//触底的时候请求数据，即为上拉加载更多
			  			//为了更加清楚的看到效果，添加了定时器
			          if (timer != null) {
			              clearTimeout(timer);
			  			
			          }
			          timer = setTimeout(function() {
			              _self.getmorenews();
			          }, 1000);
			  				
			  				// 正常应为:
			  				// _self.getmorenews();
			      },
		methods: {
			//获取更多数据
								
				getmorenews: function() {
					console.log("往上拉。。。。。page0++"+page0+' page1++:'+page1);
					
					
					var vm=this;
								//加载数据
					this.$options.methods.downList1(vm);
					},
					getnewsList: function() {//第一次回去数据
					console.log("往下拉。。。。。page0--"+page0+' page1--'+page1);
					
					    this.loadingType = 0;
					    uni.showNavigationBarLoading();//显示加载动画
						page0=1;
						page1=1;
						var vm=this;
									//加载数据
						this.$options.methods.downList1(vm);
					
						
						
					},
					//根据条件加载数据
					downList1:function(vm){
						
						//url前缀
						var beforUrl=vm.beforUrl;
						//当前选项卡对应的值
						var tab=vm.TabCur;
						//当前登陆的用户id
						var userid=uni.getStorageSync('userid');
						
						//tab0
						if(tab==0){
							var res=vm.$options.methods.downList(beforUrl,userid,tab,vm,page0);
							res.then(function(e){	
								
								uni.hideNavigationBarLoading();//关闭加载动画
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
									 // console.log("返回值："+e);
									res=JSON.parse(e).info;
									if(res.length==''){
										console.log('没有数据了,当前page0:'+page0);							 
										return;
									}
									
									vm.newsList=res;
									page0++;
									
									
								});
								 
						}else{
							var res=vm.$options.methods.downList(beforUrl,userid,tab,vm,page1);
							res.then(function(e){	
								
								uni.hideNavigationBarLoading();//关闭加载动画
								uni.stopPullDownRefresh();//得到数据后停止下拉刷新
									 // console.log("返回值："+e);
									res=JSON.parse(e).info;
									if(res.length==''){
										console.log('没有数据了,当前page1:'+page1);							 
										return;
									}
									
									vm.newsList1=res;
									page1++;
									
									
								});
								 
						}
					},
					//查询数据
					downList:function(beforUrl,userid,tab,vm,page2){							
						var rr='';
						var pageSize=vm.pageSize;
						//查询记录数量
						// var url=beforUrl+'/api/About/getListCount?userid='+userid+'&type='+tab;
						// var data={};
						// rr=vm.requestRes(url,data);
						
						//查询记录
						var url=beforUrl+'/api/About/getListByPage?userid='+userid+'&c_page='+page2+'&pageSize='+pageSize+'&type='+tab;
						var data={};
						rr=vm.requestRes(url,data);
						return rr;
						
										
					},
					
					//计算总的页码数
					getToTalPage:function(){
						//当前页面的变量：
						// var data=this.$options.propsData;
						//当前页面的方法
						 // var fuc=this.$options.methods;
						//先获取总的记录数
						
						//计算页码
						console.log('vm:'+vm.data);
					},
					
					
					//获取总的记录数——备用，参数：当前vue对象
					getListCount:function(vm){
						//查询记录数量
						var url=beforUrl+'/api/About/getListCount?userid='+userid+'&type='+tab;
						var data={};
						var rr=vm.requestRes(url,data);
						return rr;
					},
					//根据总的记录数计算总的页码数_参数：记录总数，每次增加的记录数
					getPageTotal:function(value,pageSize){
						var total=0;
						if(value>0){
							if(value%pageSize>0){
								total=parseInt(value/pageSize)+1;
							}else{
								total=value/pageSize;
							}
						}else{
							return 0;
						}
					},
			
			get() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'get'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			useCommon() {
				console.log('请确保自己已经阅读并按照公用模块文档操作 https://uniapp.dcloud.io/uniCloud/cf-common')
				uniCloud.callFunction({
					name: 'use-common'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: '云函数use-common返回结果：' + JSON.stringify(res.result),
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `云函数use-common执行失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			
		}
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
