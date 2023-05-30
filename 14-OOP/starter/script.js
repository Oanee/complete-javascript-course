'use strict';

// const Person = function(firstName, birthYear) {
// 	this.firstName = firstName
// 	this.birthYear = birthYear
//
// 	// this.calcAge = function() {
// 	// 	console.log(2037 - this.birthYear)
// 	// }
// }
//
// const jonas = new Person('Jonas', 1991)
// console.log(jonas)
//
// const matilda = new Person('Matilda', 2017)
// const jack = new Person('Jack', 1975)
// console.log(matilda)
// console.log(jack)
//
// Person.prototype.calcAge = function() {
// 	console.log(2037 - this.birthYear)
// }
//
// jonas.calcAge()
// matilda.calcAge()
//
// Person.prototype.species = 'sapiens'
//
// console.log(jonas.__proto__.__proto__)
//

// class PersonCl {
// 	constructor(fullName, birthYear) {
// 		this.fullName = fullName
// 		this.birthYear = birthYear
// 	}
//
// 	calcAge() {
// 		console.log(2037 - this.birthYear)
// 	}
// }
// //
// // const jessica = new PersonCl('Jessica', 1996)
// // console.log(jessica)
// // jessica.calcAge()
//
// const account = {
// 	owner: 'jonas',
// 	movements: [200, 530, 120, 300],
// 	birthYear: 1991,
//
// 	get latest() {
// 		return this.movements.slice(-1).pop()
// 	},
//
// 	set latest(mov) {
// 		this.movements.push(mov)
// 	},
//
// 	get age() {
// 		return 2037 - this.birthYear
// 	}
// }
//
// console.log(account)
//
// console.log(account.latest)
// account.latest = 50
// console.log(account.movements)
// console.log(account.age)
//
// class StudentCl extends PersonCl {
// 	constructor(fullName, birthYear, course) {
// 		super(fullName, birthYear);
// 		this.course = course
// 	}
//
// 	introduce() {
// 		console.log(`My name is ${this.fullName} and I study ${this.course}`)
// 	}
//
// 	calcAge() {
// 		console.log(`i'm ${2037 - this.birthYear} years old, but as a student i feel more like ${2037 - this.birthYear + 10}`)
// 	}
// }
//
// const martha = new StudentCl('Martha Jones', 2012, 'Computer science')
// console.log(martha)
// martha.introduce()
// martha.calcAge()

class Account {
	locale = navigator.language;
	#movements = [];
	#pin;



	constructor(owner, currency, pin) {
		this.owner = owner
		this.currency = currency
		this.#pin = pin
		// this._movements = []
		// this.locale = navigator.language

		console.log(`Thanks for opening an account ${owner}`)
	}

	getMovements() {
		return this.#movements
	}

	deposit(val) {
		this.#movements.push(val)

		return this
	}

	withdraw(val) {
		this.deposit(-val)

		return this
	}

	#approveLoan(val) {
		return true
	}

	requestLoan(val) {
		if(this.#approveLoan(val)) {
			this.deposit(val)
			console.log(`Loan Approved`)
		}

		return this
	}

	static helper() {
		console.log('Helper')
	}
}

const acc1 = new Account('Jonas', 'EUR', 1111)
console.log(acc1)

// acc1.movements.push(250)
// acc1.movements.push(-140)

acc1.deposit(250)
acc1.withdraw(140)
acc1.requestLoan(1000)
acc1.getMovements()

Account.helper()

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000)
