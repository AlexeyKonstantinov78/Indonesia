
const instalClassSwiper = (block) => {

    console.log(block);
    block.classList.add('swiper');
    block.querySelector('ul').className = 'swiper-wrapper about__swiper-wrapper';
    block.querySelectorAll('.about__item').forEach(item => item.className = 'swiper-slide');
    
    new Swiper('.swiper1', {
        direction: 'horizontal',
        slidesPerView: 1,
        centeredSlides: true,
        centeredSlidesBounds: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        
        breakpoints: {
            // when window width is >= 320px
            767: {
                slidesPerView: 1,
                centeredSlides: true,                
                centeredSlidesBounds: true,
            },
            320: {
                slidesPerView: 1,
                centeredSlides: true,                
                centeredSlidesBounds: true,
            },
        }
    });

    
};

window.addEventListener('DOMContentLoaded', () => {
    
    if (window.screen.width <= 767) {
        instalClassSwiper(document.querySelector('.swiper1'));
        console.log(!document.querySelector('.swiper1').closest('.swiper'));
        if (!document.querySelector('.swiper1').closest('.swiper'))  location.reload();
    }
});

window.addEventListener('resize', () => {

    if (window.screen.width > 767 && document.querySelector('.swiper1').closest('.swiper')) {
        location.reload();
    }

    if (window.screen.width <= 767) {
        instalClassSwiper(document.querySelector('.swiper1'));
        // console.log(!document.querySelector('.swiper1').closest('.swiper'));
        if (!document.querySelector('.swiper1').closest('.swiper'))  location.reload();
    }
    
});