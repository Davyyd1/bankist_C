'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatMovementDate = function(date) {
  const calcDaysPassed = (date1, date2) => Math.abs(date2-date1)/(1000 * 60 * 60 * 24);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    labelDate.textContent = day+'.'+month+'.'+year;
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(cur => (cur * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};
// calcDisplaySummary(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} EUR`;
};
// calcDisplayBalance(account1);

const user = 'Steven Thomas Williams'; // username : stw
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //display balance
  displayMovements(acc);

  // displayMovements(acc.movements);

  //display summary
  calcDisplayBalance(acc);

  //display movements
  calcDisplaySummary(acc);
};
// event handler
let currentAccount;

//fake always logged in
// currentAccount = account1;
// updateUI(currentAccount)
// containerApp.style.opacity = 100;

const date = new Date();
const day = `${date.getDate()}`.padStart(2, 0);
const month = date.getMonth();
const year = date.getFullYear();
const hour = date.getHours();
const min = date.getMinutes();
labelDate.textContent = day+'.'+month+'.'+year+` ${hour}:${min}`;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and message
    labelWelcome.textContent = `Welcome ${currentAccount.owner}`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  // console.log(recieverAcc);
  // console.log(currentAccount);

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    console.log(`transfer valid`);
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());


    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  // console.log(currentAccount);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    //add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // .indexOf(23)

    //delete account
    accounts.splice(index, 1);

    //hide ui
    containerApp.style.opacity = 0;
    // accounts.splice(index, 1);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a','b','c','d','e'];

// //slice
// console.log(arr.slice(2));
// console.log(arr.slice(2,4));
// console.log(arr.slice(1,-2));
// console.log([...arr]);

// //splice
// console.log(arr.splice(1,2));
// console.log(arr);

// //reverse
// arr = ['a','b','c','d','e'];
// const arr2= ['j','i','h','g','f'];

// console.log(arr2.reverse());
// console.log(arr2);

// //concat
// const letters = arr.concat(arr2);
// console.log(letters);

// const arr = [23,11,64];
// console.log(arr.at(2));

// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const movement of movements){
//   if(movement > 0){
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('--------foreach--------');
// movements.forEach(function(movement, i, array){
//   if(movement > 0){
//     console.log(`${i} You deposited ${movement} `);
//   } else {
//     console.log(`${i} You withdrew ${Math.abs(movement)}`);
//   }
// })

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov => mov * eurToUsd)
//   // return 23;

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for(const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map((mov, i) =>
//   `Movement ${i + 1} You ${mov>0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
// )
// console.log(movementsDescriptions);

// const deposits = movements.filter(function(mov) {
//   return mov > 0;
// })
// console.log(movements);
// console.log(deposits);

// const depositsFor =[];
// for ( const mov of movements ) if (mov > 0) depositsFor.push(mov)
// console.log(depositsFor);

// const withdrawals = movements.filter((mov) => mov < 0)
// console.log(withdrawals);

// //accumulator -> sdateball
// const balance = movements.reduce((acc, curr, i, arr) => acc + curr, 0);
// console.log(
//   balance
// );

// let balance2 = 0;
// for(const mov of movements) balance2 += mov;
// console.log(balance2);

// //Maximum value
// const max = movements.reduce((acc, mov) => {
//   if(acc > mov)
//     return acc;
//   else(mov > acc)
//     return mov
// }, movements[0]);
// console.log(max);

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * 1.1)
//   .map((mov,i,arr) => {
//     console.log(arr);
//     mov * 1.1
//   })
//   .reduce((acc, cur) => acc + cur, 0);

// console.log(totalDepositsUSD);

// const firstWithdrawal = movements.find(mov => mov < 0)
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner)

// for(const acc of accounts) {
//   if(acc.owner === 'Jessica Davis'){
//     console.log(acc);
//   }
// }

// console.log(account);

// console.log(movements);
// console.log(movements.includes(-130));

// const anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits);

// const arr = [[1,2,3], [4,5,6], 7,8];
// // console.log(arr.flat());

// const arrDeep = [[[1,2],3], [4,[5,6]], 7,8];
// // console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// //flat
// const overalBalance = accounts.map(acc=> acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// //flatmap
// const overalBalance1 = accounts.flatMap(acc=> acc.movements).reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance1);

// //strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// // console.log(owners.sort());

// //numbers
// console.log(movements);
// // console.log(movements.sort());

// movements.sort((a,b) => a-b);
// console.log(movements);
// const x = function (mov){
//   for(let i = 0; i<mov.length; i++){
//     for(let j = 0; j<mov.length; j++){
//       if(mov[j] > mov[j+1])
//       {
//         let temp = mov[j];
//         mov[j] = mov[j+1];
//         mov[j+1] = temp;
//       }
//     }
//   }
//   console.log(mov);
// }

// x(movements)

// const y = Array.from({length:7}, () => 1);
// console.log(y);

// const z = Array.from({length: 7}, (cur, i) => i+1)
// console.log(z);

// labelBalance.addEventListener('click', function() {
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el =>Number(el.textContent.replace('EUR', '')));
//   console.log(movementsUI);
// })

// ex. 1
// const bankDepositSum = accounts
//   .flatMap(accs => accs.movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, cur) => acc + cur);
// console.log(`All deposits in bank ${bankDepositSum} EUR`);


// // ex. 2
// const numDeposits1000 = accounts.flatMap(accs => accs.movements).filter(mov => mov > 1000).length;
// console.log(numDeposits1000);

// console.log(Math.sqrt(25));
// console.log(25 ** (1/2));
// console.log(8 ** (1/3));

// console.log(Math.max(5,18,23,11,22));
// console.log(Math.min(5,18,23,11,22));

// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.trunc(Math.random() * 6 ) + 1);

const randomInt = (min,max) => Math.trunc(Math.random() * (max-min) +1);

labelBalance.addEventListener('click', function(){
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0,2,4,6
    if (i % 2 === 0 ) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
    //0,3,6,9
  })
})


//create a date
// const date = new Date();
// console.log(date);

// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date('December 24, 2015'));

// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 31));

// console.log(new Date(0));

// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// //working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());