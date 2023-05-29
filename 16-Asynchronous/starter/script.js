'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// new code from master

// https://countries-api-836d.onrender.com/countries/
// const getCountryData = function (country) {
// 	const request = new XMLHttpRequest()
// 	request.open('GET', `https://restcountries.com/v2/name/${country}`)
// 	request.send()
//
// 	request.addEventListener('load', function () {
// 		const [data] = JSON.parse(this.responseText)
//
// 		const html = `
// 		<article class='country'>
//           <img class='country__img' src='${data.flag}' />
//           <div class='country__data'>
//             <h3 class='country__name'>${data.name}</h3>
//             <h4 class='country__region'>${data.region}</h4>
//             <p class='country__row'><span>👫</span>${(+data.population / 1_000_000).toFixed(1)}</p>
//             <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
//             <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
// 			`
// 		countriesContainer.insertAdjacentHTML('beforeend', html)
// 		countriesContainer.style.opacity = 1
// 	})
// }
//
// getCountryData('portugal')
// getCountryData('usa')
// getCountryData('romania')

const renderCountry = function(data, className = '') {
	const html = `
		<article class='country ${className}'>
          <img class='country__img' src='${data.flag}' />
          <div class='country__data'>
            <h3 class='country__name'>${data.name}</h3>
            <h4 class='country__region'>${data.region}</h4>
            <p class='country__row'><span>👫</span>${(+data.population / 1_000_000).toFixed(1)}</p>
            <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
            <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
			`
	countriesContainer.insertAdjacentHTML('beforeend', html)
}
//
// const getCountryAndNeighbor = function (country) {
// 	const request = new XMLHttpRequest()
// 	request.open('GET', `https://restcountries.com/v2/name/${country}`)
// 	request.send()
//
// 	request.addEventListener('load', function () {
// 		const [data] = JSON.parse(this.responseText)
// 		console.log(data)
//
// 		renderCountry(data)
//
// 		const neighbour = data.borders?.[0]
//
// 		if(!neighbour) return
// 		const request = new XMLHttpRequest()
// 		request.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`)
// 		request.send()
//
// 		request.addEventListener('load', function() {
// 			const data2 = JSON.parse(this.responseText)
// 			console.log(data2)
//
// 			renderCountry(data2, 'neighbour')
// 		})
// 	})
// }
//
// getCountryAndNeighbor('portugal')

// add new code

// const getCountryData = function (country) {
// 	fetch(`https://restcountries.com/v2/name/${country}`)
// 		.then(function(response) {
// 			console.log(response)
// 			return response.json()
// 		})
// 		.then(function (data) {
// 			console.log(data)
// 			renderCountry(data[0])
// 		})
// }

const renderError = function(msg) {
	countriesContainer.insertAdjacentHTML('beforeend', msg)
}

const getJSON = function(url, errorMSG = `Something went wrong`) {
	return fetch(url)
		.then(response=> {

			if(!response.ok) {
				throw new Error(`${errorMSG} (${response.status})`)
			}

			return response.json()
			})
}


// const getCountryData = function (country) {
// 	fetch(`https://restcountries.com/v2/name/${country}`)
// 		.then(response=> {
// 			console.log(response)
//
// 			if(!response.ok) {
// 				throw new Error(`Country not found (${response.status})`)
// 			}
//
// 			return response.json()
// 		})
// 		.then(data => {
// 			renderCountry(data[0])
// 			const neighbour = data[0].borders[0]
//
// 			if(!neighbour) return;
// 			return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
// 		})
// 		.then(response => response.json())
// 		.then(data => renderCountry(data,'neighbour'))
// 		.catch(err => {
// 			console.log(`${err} 💥💥💥💥`)
// 			renderError(`Something went wrong 💥💥 ${err.message}. Try again!`)
// 		})
// 		.finally(() => {
// 			countriesContainer.style.opacity = 1
// 		})
// }

// const getCountryData = function (country) {
// 	getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
// 		.then(data => {
// 			renderCountry(data[0])
// 			const neighbour = data[0].borders[0]
// 			console.log(neighbour)
//
// 			if(!neighbour) {
// 				throw new Error('No neighbour found!')
// 			}
//
// 			return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found')
// 		})
// 		.then(data => renderCountry(data,'neighbour'))
// 		.catch(err => {
// 			console.log(`${err} 💥💥💥💥`)
// 			renderError(`Something went wrong 💥💥 ${err.message}. Try again!`)
// 		})
// 		.finally(() => {
// 			countriesContainer.style.opacity = 1
// 		})
// }
//
// btn.addEventListener('click', () => {
// 	getCountryData('australia')
// })



// const whereAmI = function(lat, lng) {
// 	fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
// 		.then(response => response.json())
// 		.then(data => console.log(data))
// }

// whereAmI(52.508, 13.381)

// const lotteryPromise = new Promise(function(resolve, reject) {
// 	setTimeout(function() {
// 		if(Math.random() >= 0.5) {
// 			resolve('You win')
// 		} else {
// 			reject(new Error('You lost your money'))
// 		}
// 	}, 3000)
// })
//
// lotteryPromise
// 	.then(res => console.log(res))
// 	.catch(err => console.log(err))
//
// const wait = function(seconds) {
// 	return new Promise(function(resolve) {
// 		setTimeout(resolve, seconds * 1000)
// 	})
// }
//
// wait(2).then(() => {
// 	console.log('i waited for 2 sec')
// 	return wait(1)
// }).then(() => {
// 	console.log('i waited for 1 sec')
// })
//
//
// Promise.resolve('abc').then(x => console.log(x))
// Promise.reject(new Error('Problem')).catch(x => console.error(x))



// const getPosition = function() {
// 	return new Promise(function(resolve, reject) {
// 		// navigator.geolocation.getCurrentPosition(
// 		// 	position => resolve(position),
// 		// 	err => reject(err))
//
// 		navigator.geolocation.getCurrentPosition(resolve, reject)
// 	})
// }
//
// getPosition().then(pos => console.log(pos))

// const whereAmI = async function (country) {
// 	try {
// 		const res = await fetch(`https://restcountries.com/v2/name/${country}`)
//
// 		if(!res.ok) throw new Error('Wrong country')
//
// 		const data = await res.json()
// 		renderCountry(data[0])
// 		countriesContainer.style.opacity = 1
//
// 		return `You are in ${data[0].name}`
// 	} catch (err) {
// 		renderError(`Something went wrong ${err.message}`)
// 		countriesContainer.style.opacity = 1
//
// 		throw  err
// 	}
// };
//
// console.log(1);
//
// (async function() {
// 	try {
// 		const city = await whereAmI('portugal')
// 		console.log(2, city)
//
// 	} catch (err) {
//  	console.error(err.message)
// 	}
//
// 	console.log(3)
// })()


const get3Countries = async function(c1, c2, c3) {
	try {
		// const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
		// const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
		// const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)
		//
		// console.log([data1.capital, data2.capital, data3.capital])


		const data = await Promise.all([
			getJSON(`https://restcountries.com/v2/name/${c1}`),
			getJSON(`https://restcountries.com/v2/name/${c2}`),
			getJSON(`https://restcountries.com/v2/name/${c3}`)])

		console.log(data.map(d => d[0].capital))

	} catch (err) {
		console.log(err)
	}
}

get3Countries('portugal', 'canada', 'tanzania')
