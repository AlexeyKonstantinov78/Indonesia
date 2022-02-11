const tourCalc = document.querySelector('.tour__calc'),
    calcСountFieldset = document.querySelector('.calc__count-fieldset'),
    calcDateFieldset = document.querySelector('.calc__date-fieldset'),
    calcOptionsFieldset = document.querySelector('.calc__options-fieldset'),
    priseOnePerson = 45000, //в рублях
    priseBabySitter = 2000,
    prisePersonalMenu = 5000,
    prisePersonalGuide = 9000,
    priseImprovedTent = 15000;

let count = 0,
    date ='',
    options = [];

const instBtn = (summ) => {
    const tourSummary = document.querySelector('.tour__summary');    
    if (summ) {
        tourSummary.textContent = summ.toLocaleString('ru-RU') + ' ₽';    
    } else {
        tourSummary.textContent = 'Узнать цену';
    }   
};

const toggle = (className) => {     
    const tagClass = document.querySelector(`.${className}`);
    tagClass.classList.toggle(className + '_active');
};

const calcSpan = (value, className) => {    
    const calcClassName = document.querySelector(`.${className}`);    

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'calc__count') {
        count = value;
        instBtn(false);
        calcClassName.querySelector('.tour__span').textContent = count + ' человек';
    }

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'calc__date') {
        date = value;
        instBtn(false);
        calcClassName.querySelector('.tour__span').textContent = date;
    }

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'calc__options') {
        instBtn(false);
        calcClassName.querySelector('.tour__span').textContent = value.join(', ');
    }    
}

const  calculator = () => {
    let summary = 0;
    summary = priseOnePerson * count;

    options.forEach(item => {
        if (item === 'Няня') summary += priseBabySitter;
        if (item === 'Персональное меню') summary += prisePersonalMenu;
        if (item === 'Персональный гид') summary += prisePersonalGuide;
        if (item === 'Улучшенная палатка') summary +=  priseImprovedTent;
    });
        
    instBtn(summary);
};

// открываем и закрываем daw 
tourCalc.addEventListener('click', (event) => {
    let target = event.target;

    if (target.parentNode.classList.contains('calc__count')) {        
        toggle('calc__count-fieldset');
    }

    if (target.parentNode.classList.contains('calc__date')) {
        toggle('calc__date-fieldset');
    }

    if (target.parentNode.classList.contains('calc__options')) {
        toggle('calc__options-fieldset');
    }


    if (target.classList.contains('tour__btn')) {
        if (count !== 0 &&  date !== '' && options.length >0) {
            calculator();
        } else {
            console.log('выберите все значения');
        }
    }

});

// получаем значение value calcСount
calcСountFieldset.addEventListener('click', (event) => {
    let target = event.target;
    
    if (target.checked) {        
        calcSpan(target.value, 'calc__count');
        toggle('calc__count-fieldset');
    }
});

//получаем значение value calc__date
calcDateFieldset.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('calc__date-btn')) {
        
        calcDateFieldset.querySelectorAll('.radio-input').forEach(item => {
            
            if (item.checked) {
                toggle('calc__date-fieldset');                
                calcSpan(item.value, 'calc__date');
            }
        });
        
    }

});

// получаем options 
calcOptionsFieldset.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('calc__options-btn')) {
        options = [];
        calcOptionsFieldset.querySelectorAll('.calc__options-input').forEach(item => {
            
            if (item.checked) {
                options.push(item.value);
            }
        }) ;

        if (options.length > 0) {
            toggle('calc__options-fieldset');
            calcSpan(options, 'calc__options');
        }
        
    }

});
