'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCLoseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
	modal.classList.remove('hidden')
	overlay.classList.remove('hidden')
}

const closeModal = function () {
	modal.classList.add('hidden')
	overlay.classList.add('hidden')
}

for (let i = 0; i < btnsOpenModal.length; i++) {
	btnsOpenModal[i].addEventListener('click', openModal)
}

btnCLoseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal()
	}
})
