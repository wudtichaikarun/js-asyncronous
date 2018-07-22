var fs = new require('fs');

function readFilePromise(filename) {
	var myPromise = new Promise(function(resolve, reject) {
		console.log('register: ' + filename);
		fs.readFile(filename, function(error, data) {
			resolve(data.toString());
		});
	});
	return myPromise;
}

var promises = [ readFilePromise('text1.txt'), readFilePromise('text2.txt'), readFilePromise('text3.txt') ];

// Promise.all(promises).then(function(results) {
// 	var str = '';
// 	for (var i = 0; i < results.length; i++) {
// 		str += results[i];
// 	}
// 	console.log(str);
// });

Promise.all(promises).then(function(results) {
	// results = [111, 222, 333]
	const str = results.reduce((accumulator, currentValue) => (accumulator += currentValue));
	console.log(str); //111222333
});

console.log('done');
/**
 * How it work 
 * Promise.all([]) ไล่ทำ promise แต่ละตัว และเมื่อทำเสร็จแล้วก็รวบผลลัพธ์มาเป็น array 
 * เราจะได้ผลลัพธ์ 1 item ใน array ต่อหนึ่ง Promiseใช้หลักการเหมือนฟังก์ชัน map() นั่นเอง 
 * และ callback ของ then() ทำหน้าที่เป็นตัว reduce()
 */
