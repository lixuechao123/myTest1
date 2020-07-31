'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	//获取前端传来的参数集合event
	var page_size=event.page_size;
	var current_page=event.current_page;	
	console.log("参数event："+JSON.stringify(event));
	// console.log("参数contex:"+JSON.stringify(context))
	const collection = db.collection(event.table);
	//获得记录的数量
	var record_num=await collection.count();
	/*计算出总共的页码数量*/
	//看看总记录数除以每页的记录数量是否能整除，
	var result=record_num%page_size;
	//如果能够整除，总的页码数就是商，否则就是商加一
		var total_page=0;
	if(result==0){
		total_page=result;
	}else{
		total_page=result+1;
	}


	console.log("参数event："+JSON.stringify(event));
	// console.log("参数contex:"+JSON.stringify(context))
	const collection = db.collection(event.table)

	const res = await collection.limit(10).get()
	 console.log('云函数返回的结果：'+JSON.stringify(res.data))
	return res
};
