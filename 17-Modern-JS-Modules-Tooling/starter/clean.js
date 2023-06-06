'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze( {
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) =>  limits?.[user] ?? 0;

const addExpanse = function (state, limits, value, description, user='Jonas') {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser) ? [...state, { value: -value, description, user: cleanUser }] : state;
};
const newBuget1 = addExpanse(budget, spendingLimits, 10, 'Pizza 🍕');
const newBuget2 = addExpanse(newBuget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBuget3 = addExpanse(newBuget2, spendingLimits, 200, 'Stuff', 'Jay');

console.log(newBuget3)

const checkExpanses = function (state, limits) {
  return state.map(entry => entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry)
};

const finalBudget = checkExpanses(newBuget3, spendingLimits);
console.log(finalBudget)


const logBigExpenses = function (state, bigLimit) {
  const bigExpanses = state
      .filter(entry => entry.value <= -bigLimit)
      .map(entry => entry.description.slice(-2))
      .join(' / ')
      // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}` , '')

  console.log(bigExpanses)
};

console.log(budget);
logBigExpenses(finalBudget, 500)
