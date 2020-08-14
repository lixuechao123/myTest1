'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	//event为客户端上传的参数
	const collection = db.collection(event.table);
	// const res=await  collection.where({"_id":event.id}).get()
const res=await collection.doc(event.id).get()
	//返回数据给客户端
	return res
};
