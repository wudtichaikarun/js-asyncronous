/** ทำงานแบบ Synchronous อยากให้เป็น Asynchronous ก็จับไปใช้คู่ Promise
 * Generator Object -> gen1, gen2 ประกอบก้วย 2 ส่วนคือ [[GeneratorState]],[[GeneratorContext]]  
 * |--[[GeneratorState]] มี 4 สถานะ
 * |---- 1. suspendedStart
 * |---- 2. suspendedYield
 * |---- 3. executing
 * |---- 4. completed
 * |---- [[GeneratorState]] เป็น completed จะได้ผลลัพธ์ { value: undefined, done: true} 
 * |--[[GeneratorContext]] 
 * |---- เก็บตำแหน่งที่ทำค้างอยู่เมื่อเราสั่ง .next() 
 * |---- โดยที่ [[GeneratorState]] อยู่ในสถานะ suspendedStart หรือ suspendedYield 
 * |---- มันก็จะเอา frame ดังกล่าวไปบรรจุไว้บน stack แล้วสั่งทำงาน
 */
function* displayChars(str) {
	for (var i = 0; i < str.length; i++) {
		yield str[i];
	}
}

function* double(times) {
	var num = 2;
	for (var i = 0; i < times; i++) {
		num = num * 2;
		yield num;
	}
}

function scheduler(func1, param1, func2, param2) {
	var gen1 = func1(param1);
	var gen2 = func2(param2);
	var result1, result2;
	do {
		result1 = gen1.next();
		result2 = gen2.next();
		if (result1.done === false) {
			console.log('gen1: ' + result1.value);
		}
		if (result2.done === false) {
			console.log('gen2: ' + result2.value);
		}
	} while (!(result1.done === true && result2.done === true));
}

scheduler(displayChars, 'Hello', double, 7);

/** result
gen1: H
gen2: 4
gen1: e
gen2: 8
gen1: l
gen2: 16
gen1: l
gen2: 32
gen1: o
gen2: 64
gen2: 128
gen2: 25
 */
