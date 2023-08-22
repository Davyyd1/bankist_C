'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(cur => (cur * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = `${interest} €`;
};
// calcDisplaySummary(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
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
  displayMovements(acc.movements);
  
  // displayMovements(acc.movements);

  //display summary
  calcDisplayBalance(acc);

  //display movements
  calcDisplaySummary(acc);
};
// event handler
let currentAccount;

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
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // console.log(currentAccount);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
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

// //accumulator -> snowball
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

console.log(movements);
console.log(movements.includes(-130));

const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);