'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	//获取前端传来的参数集合event
	var page_size=event.page_size;
	var current_page=event.current_page;		
	const collection = db.collection(event.table);
	
	var begin_index=page_size*(current_page-1);
	// console.log("分页的起始位置："+begin_index)
	var end_index=begin_index+page_size;
	
 const res=await  collection.where({"del":0}).skip(begin_index).limit(end_index).get()
	  // console.log('get_xiangmu返回的结果：'+JSON.stringify(res))
	return res
};
