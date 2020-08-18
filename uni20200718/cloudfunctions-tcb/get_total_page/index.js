'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	//获取前端传来的参数集合event
	var page_size=event.page_size;
//	var current_page=event.current_page;		
	const collection = db.collection(event.table);
	//获得记录的数量
	var res;
	if(event.where==""){
		res=await collection.count();
	}else{		
		
		// var  obj=new RegExp('^项目');
		// console.log("查询条件："+JSON.stringify(obj))
		// res=await collection.where({"name":new RegExp('^项目'),"del":new RegExp('^0')}).count();
		res=await collection.where({
			"name":new RegExp('^项目'),
			"note":new RegExp('.*备注.*')
			
		}).count()
	}
	

	 var record_num=res.total;
	 console.log('记录总数：'+record_num)
	/*计算出总共的页码数量*/
	//看看总记录数除以每页的记录数量是否能整除，
	 var result=record_num%page_size;
	 console.log('取余结果：'+result)
	//如果能够整除，总的页码数就是商，否则就是商加一
		 var total_page=0;
	if(result==0){
		total_page=record_num/page_size;
	}else{
		total_page=Math.ceil(record_num/page_size) 
	}
 console.log("总的页码是："+total_page)
return total_page
	};
