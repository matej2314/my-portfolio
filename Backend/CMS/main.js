"strict";

const sectionEl = document.getElementById('section');

const sectionCloseBtn = document.getElementById('section__closeButton');

sectionCloseBtn.addEventListener('click', () => {
    sectionEl.classList.toggle('hidden');
})