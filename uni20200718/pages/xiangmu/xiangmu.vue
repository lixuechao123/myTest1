<template>
	<view class="content">
		
		<view class="tips">
			
			<view>开始愉快的体验uniCloud吧！</view>
		</view>
		<view class="btn-list">
			<button type="primary" @click="add">新增一条数据</button>
			<button type="primary" @click="remove">删除一条数据</button>
			<button type="primary" @click="update">修改数据</button>
			<button type="primary" @click="get">查询前10条数据</button>
			<button type="primary" @click="useCommon">使用公用模块</button>
			<button type="primary" @click="upload">上传文件</button>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
</style>

