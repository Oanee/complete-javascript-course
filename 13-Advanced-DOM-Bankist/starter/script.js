'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', (e) => {
  section1.scrollIntoView({behavior: 'smooth'})
})

document
    .querySelector('.nav__links')
    .addEventListener('click', function (e) {
      e.preventDefault()

      if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
      }
    })

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked)

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active')
})
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
    })

    logo.style.opacity = this
  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries) {
  const [entry] = entries

  if(!entry.isIntersecting)
    nav.classList.add('sticky')
  else
    nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header)


const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

allSections.forEach((section) => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})


const imgTargets = document.querySelectorAll('img[data-src]')
const loadImg = function(entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const photoObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`
})

imgTargets.forEach(img => {
  photoObserver.observe(img)
})

const slider = function () {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')

  let curSlide = 0
  const maxSlide = slides.length

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend',
          `<button class='dots__dot' data-slide='${i}'></button>`
      )
    })
  }


  const activateDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'))

    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active')
  }


  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  }


  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0
    } else {
      curSlide++
    }

    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1
    } else {
      curSlide--
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = function () {
    goToSlide(0)
    createDots()
    activateDot(0)
  }

  init()

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide()
    if (e.key === 'ArrowRight') nextSlide()
  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset
      goToSlide(slide)
      activateDot(slide)
    }
  })
}
slider()

// window.addEventListener('beforeunload', function(e) {
//   e.preventDefault()
//   e.returnValue = ''
// })


// const initialCoords = section1.getBoundingClientRect()
// window.addEventListener('scroll', function() {
//   if(window.scrollY > initialCoords.top)
//     nav.classList.add('sticky')
//   else
//     nav.classList.remove('sticky')
// })

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }
//
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
//
// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

// document
//     .querySelectorAll('.nav__link')
//     .forEach(elem => {
//       elem.addEventListener('click', function (e) {
//         e.preventDefault()
//         const id = this.getAttribute('href')
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//       })
//     })

///////////////////////////////////////////////
// console.log(document.body)
// document.querySelector('.header')
// const header = document.querySelector('.header')
// const message = document.createElement('div')
// message.classList.add('cookie--message')
// message.innerHTML = 'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>'
// // header.prepend((message))
// header.append(message)
//
// // header.append(message.cloneNode(true))
//
// // header.before(message)
// // header.after(message)
//
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.remove()
// })
//
// message.style.background = '#37383d'
// message.style.width = '120%'



// const h1 = document.querySelector('h1')
//
// const alertH1 = (e) => {
//   alert('addEventListener: Great!')
//
//   h1.removeEventListener('mouseenter', alertH1)
// }
//
// h1.addEventListener('mouseenter', alertH1)

// h1.onmouseenter = (e) => {
//   alert('addEventListener: Great!')
// }

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1))
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// console.log(randomColor())
//
// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//
//   // e.stopPropagation()
// })
//
// document.querySelector('.nav__links').addEventListener('click', function() {
//   this.style.backgroundColor = randomColor()
// })
//
// document.querySelector('.nav').addEventListener('click', function() {
//   this.style.backgroundColor = randomColor()
// })

// const h1 = document.querySelector('h1')
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'orangered'
//
// console.log(h1.firstChild)
// console.log(h1.firstElementChild)
// console.log(h1.parentNode)
// console.log(h1.parentElement)
//
// h1.closest('.header').style.background = 'var(--gradient-secondary)'
