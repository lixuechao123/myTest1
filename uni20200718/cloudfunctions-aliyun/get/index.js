'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log("参数event："+JSON.stringify(event));
	// console.log("参数contex:"+JSON.stringify(context))
	const collection = db.collection(event.table)
	const res = await collection.limit(10).get()
	 console.log('云函数返回的结果：'+JSON.stringify(res.data))
	return res
};
