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

const displayMovements = function (movements, sort = false) {
	containerMovements.innerHTML = ''

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

	movs.forEach((mov, i) => {
		const type = mov > 0 ? 'deposit' : 'withdrawal'

		const html = `
        <div class='movements__row'>
          <div class='movements__type movements__type--${type}'>${i + 1} deposit</div>
          <div class='movements__value'>${mov} €</div>
        </div>
    `

		containerMovements.insertAdjacentHTML('afterbegin', html)
	})
}


const calcDisplayBalance = (acc) => {
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
	labelBalance.textContent = `${acc.balance} €`
}

const calcDisplaySummary = (acc) => {
	const incomes = acc.movements
		.filter(mov => mov > 0)
		.reduce((acc, mov) => acc + mov, 0)
	labelSumIn.textContent = `${incomes} €`

	const out = acc.movements
		.filter(mov => mov < 0)
		.reduce((acc, mov) => mov + acc, 0)
	labelSumOut.textContent = `${Math.abs(out)} €`

	const interest = acc.movements
		.filter(mov => mov > 0)
		.map(deposit => deposit * acc.interestRate / 100)
		.filter(int => int >= 1)
		.reduce((acc, int) => acc + int, 0)
	labelSumInterest.textContent = `${interest} €`
}

const createUsernames = (accs) => {
	accs.forEach((acc) => {
		acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
	})
}
createUsernames(accounts)

const updateUI = (acc) => {
	displayMovements(currentAccount.movements)

	calcDisplayBalance(currentAccount)

	calcDisplaySummary(currentAccount)
}

let currentAccount;
btnLogin.addEventListener('click', (e) => {
	e.preventDefault()

	currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
	console.log(currentAccount)

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

		containerApp.style.opacity = 100

		inputLoginUsername.value = inputLoginPin.value = ''
		inputLoginPin.blur()

		updateUI()
	}
})

btnTransfer.addEventListener('click', (e) => {
	e.preventDefault()

	const amount = Number(inputTransferAmount.value)
	const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

    inputTransferAmount.value = inputTransferTo.value = '';

	if (amount > 0 &&
		currentAccount.balance >= amount
		&& receiverAcc?.username !== currentAccount.username
    ) {
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount)

		updateUI()
	}
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault()

  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount)

    updateUI(currentAccount)
  }

  inputLoanAmount.value = ''
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault()

  if (inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = ''
})

let sorted = false
btnSort.addEventListener('click', (e) => {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];
//
// console.log(arr.slice(2))
// console.log(arr.slice(2, 4))
// console.log(arr.slice(-2))
// console.log(arr.slice(-1))
// console.log(arr.slice(1, -2))
// console.log(arr.slice())
// console.log([...arr])
//
// // console.log(arr.splice(2))
// arr.splice(-1)
// arr.splice(1, 2)
// console.log(arr)
//
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'h', 'f']
// console.log(arr2.reverse())
// console.log(arr2)
//
// const letters = arr.concat(arr2)
// console.log(letters)
// console.log([...arr, ...arr2])
//
// console.log(letters.join('-'))

// const arr = [23, 11, 64]
// console.log(arr[0])
// console.log(arr.at(0))
//
// console.log(arr[arr.length - 1])
// console.log(arr.slice(-1)[0])
// console.log(arr.at(-1))
//
// console.log('jonas'.at(-1))


// for (const movement of movements) {
//   if (movement > 0) {
//     console.log('Success')
//   } else {
//     console.log('False')
//   }
// }

// movements.forEach((movement, index, array) => {
//   if (movement > 0) {
//     console.log('Success')
//     console.log(index)
//     console.log(array)
//   } else {
//     console.log('False')
//   }
// })

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
//
// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`)
// })
//
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
// currenciesUnique.forEach((value,_, map) => {
//   console.log(`${value}: ${value}`)
// })
//
// const ages = [5, 2, 4, 1, 15, 8, 3]
// const ages2 = [16, 6, 10, 5, 6, 1, 4]
// const calcAverageHumanAge = (dogAges) => {
//   const goodAge = []
//   dogAges.map((dogAge) => {
//     if (dogAge <= 2) {
//       if (2 * dogAge > 18) {
//         goodAge.push(2 * dogAge)
//         return 2 * dogAge
//       }
//     } else {
//       goodAge.push(16 + dogAge * 4)
//       return 16 + dogAge * 4
//     }
//   })
//   const reduceAge = goodAge.reduce((acc, curr, i, arr) => {
//     return (acc + curr) / arr.length
//   }, goodAge[i]);
//
//   console.log(goodAge)
//   console.log(reduceAge)
// }
//
// calcAverageHumanAge(ages)
// calcAverageHumanAge(ages2)

// const calcAverageHumanAge = (ages) => {
//   const humanAges = ages.map(age => age >= 2 ? 2 * age : 16 + age * 4)
//   const adults = humanAges.filter(age => age >= 18)
//   console.log(humanAges)
//   console.log(adults)
//
//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length
//
//   const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0)
//
//   console.log(average)
//   return average
// }
//
// // calcAverageHumanAge(ages)
// // calcAverageHumanAge(ages2)
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// // const totalDepositsUSD = movements
// //     .filter(mov => mov > 0)
// //     .map(mov => mov * 1.1)
// //     .reduce((acc, mov) => acc + mov, 0)
// // console.log(totalDepositsUSD)
//
// const first = movements.find(mov => mov < 0)
// console.log(movements)
// console.log(first)
//
// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account)
//
// const dice = Array.from({length: 100}, () => (Math.trunc(Math.random() * 6) + 1))
// console.log(dice)
//
//
//
// labelBalance.addEventListener('click', () => {
//   const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
//       el => Number(el.textContent.replace('€', '')))
//   console.log(movementsUI)
// })

// 1.
// const sumDep = accounts
//     .flatMap(acc => acc.movements)
//     .filter(mov => mov > 0)
//     .reduce((sum, cur) => sum + cur, 0)
//
// console.log(sumDep)
//
// //2.
// const numDep1000 = accounts
//     .flatMap(acc => acc.movements)
//     .reduce((count, curr) => curr >= 1000 ? ++count : count, 0)
// console.log(numDep1000)
//
// //3.
// const {deposits, widthdrawels} = accounts
//     .flatMap(acc => acc.movements)
//     .reduce((sums, curr) => {
//       // curr > 0 ? sums.deposits += curr : sums.widthdrawels += curr
//       sums[curr > 0 ? 'deposits' : 'widthdrawels'] += curr
//       return sums
//     }, {deposits: 0, widthdrawels: 0})
// console.log({deposits, widthdrawels})
//
// //4.
// const convertTitleCase = (title) => {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1)
//
//   const exceptions = ['a', 'an', 'the','and', 'but', 'or', 'on', 'in', 'with']
//
//   const titleCase = title
//       .toLowerCase()
//       .split(' ')
//       .map(word => exceptions.includes(word) ? word : capitalize(word))
//       .join(' ')
//   return titleCase
// }
// console.log(convertTitleCase('this is a nice title'))
// console.log(convertTitleCase('this is a LONG title but no too long'))
// console.log(convertTitleCase('and here is another title with an EXAMPLE'))

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// let recommendedFood;
//
// const ownersEatTooMuch =[]
// const ownersEatTooLittle =[]
//
// const newFood = dogs
//     .map(food => recommendedFood = (food.weight ** 0.75 * 28))
//     .filter((_, index) => {
//       if (dogs[index].curFood > (recommendedFood * 0.90) && dogs[index].curFood < (recommendedFood * 1.10)) {
//         console.log('Not good')
//       } else {
//         console.log('Good')
//       }
//
//       if (dogs[index].curFood > (recommendedFood * 0.90)) {
//         ownersEatTooMuch.push(dogs[index].owners)
//       }
//
//       if (dogs[index].curFood < (recommendedFood * 1.10)) {
//         ownersEatTooLittle.push(dogs[index].owners)
//       }
//     })
//
// console.log(newFood)
// console.log(ownersEatTooMuch)
// console.log(ownersEatTooLittle)

dogs.forEach(dog => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28))
console.log(dogs)

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(dogSarah)

console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`)

const ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > dog.recFood)
    .flatMap(dog => dog.owners)

const ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < dog.recFood)
    .flatMap(dog => dog.owners)

console.log(ownersEatTooMuch)
console.log(ownersEatTooLittle)
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`)
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`)

console.log(dogs.some(dog => dog.curFood === dog.recFood))

const check = dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1

console.log(dogs.some(check))

console.log(dogs.filter(check))

const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood)
console.log(dogsCopy)
