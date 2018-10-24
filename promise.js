//Question 3  Promise return Promise
const fs = require('fs');
const zlib = require('zlib');

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile('./text1.txt', 'utf8')
  .then(
    data => {
      return gzip(data);
    },
    err => console.log('Fail to read', err)
  )
  .then(
    data => {
      console.log(data);
    },
    err => console.log('Fail To Gzip: ', err)
  );

// Error Handling
Promise.reject('fail')
  .then(val => console.log(val))
  .then(val => console.log(val), err => console.log(err)); // fail

new Promise((resolve, reject) => {
  // return like reject()
  throw 'throw fail';
})
  .then(val => console.log(val))
  .then(val => console.log(val), err => console.log(err)); // throw fail

Promise.reject('fail')
  // .then(val => {
  //   throw 'fail';
  // })
  .then(val => console.log(val))
  // .then(null, err => console.log(err)); sintax sugar line below
  // note catch work only you using reject
  .catch(err => console.log(err));

// Question 4 Convert the previous code so that it now handles errors using the catch handler
const fs = require('fs');
const zlib = require('zlib');

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile('./text11111.txt', 'utf8')
  .then(data => {
    return gzip(data);
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => console.error('----> Failed: ', err));
