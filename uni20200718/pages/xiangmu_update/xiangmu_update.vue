<template>
	<view>
		
		<table>
			<tr>
				<td><tex>项目名</tex></td>
				<td><input v-model="xiangmu.name" /></td>				
			</tr>
			<tr>
				<td><tex>开始时间</tex></td>
				<td><input v-model="xiangmu.beginTime" /></td>				
			</tr>
			<tr>
				<td><tex>结束时间</tex></td>
				<td><input v-model="xiangmu.endTime" /></td>				
			</tr>
			<tr>
				<td><tex>是否结束</tex></td>
				<td><input v-model="xiangmu.isOver" /></td>				
			</tr>
			<tr>
				<td><tex>备注</tex></td>
				<td><input v-model="xiangmu.note" /></td>				
			</tr>
		</table>
		<button @click="save(id)">保存</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				xiangmu:"",
				id:""
			}
	},
	onLoad(e) {
		console.log("onload参数："+e.id)
		this.id=e.id;
		if(e.id==undefined){
			e.id='abd27dd45f313c43005bcb0c00a3e945'
		}else if(e.id==0){
			this.xiangmu={};
		}else{
			this.getinfo(e.id)
		}
		
	},
	methods:{
		save(id){
			
			var vm=this;
			uniCloud.callFunction({
				"name":"update_one",
				data:{
					"table":"xiangmu",
					"id":id,
					"content":vm.xiangmu
				}
			}).then((res)=>{
				uni.showToast({
					title:"保存成功"
				})
			}).catch((err)=>{
				console.log("保存失败"+err.message)
			})
		},
		getinfo(id){
			var vm=this;
			uniCloud.callFunction({
				"name":"get_one",
				data:{
					"table":"xiangmu",
					"id":id
				},
			}).then((res)=>{
				console.log("返回的项目信息："+JSON.stringify(res.result.data[0]))
				vm.xiangmu=res.result.data[0];
				
			}).catch(
			(err)=>{
				uni.showModal({
					content:"查询失败，错误信息"+err.message
				})
			}
			)
		}
	}
	}
</script>

<style>
</style>
