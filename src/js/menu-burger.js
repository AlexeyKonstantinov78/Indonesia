'use strict';

const menuBurgerBtn = document.querySelector('.menu-burger__btn'),
    menuBurgerNav = document.querySelector('.menu-burger__nav');


const toogle = () => {
    menuBurgerNav.classList.toggle('activ');
};

menuBurgerBtn.addEventListener('click', () => {    
    toogle();
});

menuBurgerNav.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('menu-burger__link')) {
        toogle();
    }
});