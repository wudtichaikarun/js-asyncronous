/** Async/Await */

// How to create

//when using promises we attach a then
const doAsyncTask = () => Promise.resolve('done');
doAsyncTask().then(val => console.log(val));
console.log('here'); // <--- this is called first

//when using aync/await we don't need to attach a then
const doAsyncTask = () => Promise.resolve('done');
async function asim() {
  let value = await doAsyncTask(); // <--- don't need to call .then
  console.log(value);
}
asim();
console.log('here'); // <--- this is called first

// can write that as an IFFE
const doAsyncTask = () => Promise.resolve('done');
(async function() {
  let value = await doAsyncTask(); // <--- don't need to call .then
  console.log(value);
})();

// also it blocks
const doAsyncTask = () => Promise.resolve('done');
(async function() {
  let value = await doAsyncTask(); // <--- don't need to call .then
  console.log(value); // <--- this is called first
  console.log("wait before it's printed");
})();

// Async functions return a promise
const doAsyncTask = () => Promise.resolve('1...');
let asyncFunction = async function() {
  let value = await doAsyncTask();
  console.log(value);
  console.log('2...');
  return '3...'; // Whatever we return is like a resolve
};
asyncFunction().then(value => console.log(value)); // "3..."

// Handling Errors
// Because it's now sync we can use try/catch, the catch value is what was returned in the reject
const doAsyncTask = () => Promise.reject('Error...');
const asyncFunction = async function() {
  try {
    const value = await doAsyncTask();
  } catch (e) {
    console.log('---> Catch', e);
    return;
  }
};
asyncFunction();
