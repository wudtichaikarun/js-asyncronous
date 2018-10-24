/** Question 3  Promise return Promise */
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
// ********************************************************************************

/** Error Handling */
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
// ********************************************************************************

/** Finally */
Promise.resolve('done')
  .then(val => {
    throw new Error('-------> fail');
  })
  .then(val => console.log(val)) // not invoked
  .catch(err => console.error(err)) // invoked
  .finally(_ => console.log('Cleaning Up')); // alway invoked
// ********************************************************************************

/** Multiple Promise --> Promise.all */
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

const files = ['text1.txt', 'text2.txt', 'text3.txt'];

let promises = files.map(name => readFile(name, 'utf8'));

Promise.all(promises)
  .then(values => {
    console.log(values);
  })
  .catch(err => console.error('---> Error:', err));
// ********************************************************************************

/** Promise.race */
// Promise will return resolve or reject just firt value
let car1 = new Promise(
  resolve => setTimeout(resolve, 5000, 'Car 1.')
  // setTimeout(reject, 1000, 'Car 1 is crashed.')
);
let car2 = new Promise(resolve =>
  setTimeout(resolve, 2000, 'Car 2.')
);
let car3 = new Promise(resolve =>
  setTimeout(resolve, 3000, 'Car 3.')
);

Promise.race([car1, car2, car3])
  .then(value => {
    console.log('Promise Resolved', value);
  })
  .catch(err => console.log('------> Promise reject', err));
// ********************************************************************************

/** Question 5
 * Create some code that tries to read from disk a file and times out
 * if it takes longer than 1 seconds, use Promise.race
 */

function readFileFake(sleep) {
  return new Promise(resolve =>
    setTimeout(resolve, sleep, 'read file')
  );
}

function timeout(sleep) {
  return new Promise((_, reject) =>
    setTimeout(reject, sleep, 'timeout')
  );
}

// Promise.race([readFileFake(5000), timeout(1000)])
Promise.race([readFileFake(1000), timeout(5000)])
  .then(data => console.log(data))
  .catch(err => console.error(err));

//readFileFake(5000); // resolves a promise after 5 seconds, pretend it's a large file being read from disk

// ********************************************************************************

/** Question 6
 * Create a prosess flow which publishes a file from a server, then realises the suer needs to login,
 * then makes a login request, the whole chain should error out if it takes longer than 1 seconds.
 * Use `catch` to handle errors and timeours.
 */

function authenticate() {
  console.log('Authenticating');
  return new Promise(resolve =>
    setTimeout(resolve, 2000, { status: 200 })
  );
}

function publish() {
  console.log('Publishing');
  return new Promise(resolve =>
    setTimeout(resolve, 2000, { status: 403 })
  );
}

function safePublish() {
  return publish().then(res => {
    if (res.status === 403) {
      return authenticate();
    }
    return res;
  });
}

function timeout(sleep) {
  return new Promise((resolve, reject) =>
    setTimeout(reject, sleep, 'timeout...')
  );
}

Promise.race([safePublish(), timeout(3000)])
  .then(_ => console.log('Published'))
  .catch(err => {
    if (err === 'timeout') {
      console.error('Request timed out');
    } else {
      console.error(err);
    }
  });
/** Publishing
 * Authenticating
 * Error: timeout...  // because publish() take 2 second and autheticate() take 2 secode 2000+2000 = 4000 > timeout(3000)
 */
