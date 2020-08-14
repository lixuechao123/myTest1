'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	const collection=db.collection(event.table)
	var res;
	//如果是新增
	if(event.id==0){
		 res=await	collection.add(event.content)	
	}else{
		//将event.content中的_id的相关内容去掉
	var new_content={};
	var content=event.content;
	for(var key in content){
		
		if(key=="_id"){
			continue;
		}
		var a=content[key];		
		new_content[key]=a;
				
	}
	 // console.log("新的json"+JSON.stringify(new_content))
	res=await	collection.doc(event.id).update(new_content)	
	}
	
	//返回数据给客户端
 	return res

};
