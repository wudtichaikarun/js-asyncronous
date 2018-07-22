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

Promise.all(promises).then(function(results) {
	var str = '';
	for (var i = 0; i < results.length; i++) {
		str += results[i];
	}
	console.log(str);
});
console.log('done');
