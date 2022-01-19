'use strict';

const menuBurgerBtn = document.querySelector('.menu-burger__btn'),
    menuBurgerNav = document.querySelector('.menu-burger__nav');


const toogle = () => {
    menuBurgerNav.classList.toggle('activ');
};

menuBurgerBtn.addEventListener('click', () => {
    
    toogle();
});