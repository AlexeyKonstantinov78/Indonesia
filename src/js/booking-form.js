const bookingForm = document.querySelector('.booking__form'),
    bookingInputFio = document.querySelector('.booking__input_fio'),
    bookingInputEmail = document.querySelector('.booking__input_email'),
    bookingInputTel = document.querySelector('.booking__input_tel'),
    regexpFio = /^[а-яА-ЯёЁa-zA-Z ]+$/gi,
    regexpEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
    regexpTel = /^\d[\d\(\)\ -]{4,14}\d$/,
    priseOnePerson = 45000, //в рублях
    priseBabySitter = 2000,
    prisePersonalMenu = 5000,
    prisePersonalGuide = 9000,
    priseImprovedTent = 15000;

let dateForm = '',
    countForm = 0,
    optionsForm = [];

function valid(item, regExp) {

    console.log(item.value);    
    // console.log(regExp.test(item.value));    
    return regExp.test(item.value);
};

const formSpan = (value, className) => {    
    const calcClassName = bookingForm.querySelector(`.${className}`);    

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'booking__count') {
        countForm = value;
        // instBtn(false);
        calcClassName.querySelector('.tour__span').textContent = countForm + ' человек';
    }

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'booking__date') {
        dateForm = value;
        // instBtn(false);
        calcClassName.querySelector('.tour__span').textContent = dateForm;
    }

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'booking__options') {
        // instBtn(false);
        calcClassName.querySelector('.tour__span').textContent = value.join(', ');
    }    
};

const toggle = (className) => {     
    const tagClass = bookingForm.querySelector(`.${className}`);
    tagClass.classList.toggle(className + '_active');
};

const formSumm = () => {    
    const resultText = bookingForm.querySelector('.booking__result-text'),
        resultSumm = bookingForm.querySelector('.booking__result-sum');

    let summary = 0;
    summary = priseOnePerson * countForm;

    optionsForm.forEach(item => {
        if (item === 'Няня') summary += priseBabySitter;
        if (item === 'Персональное меню') summary += prisePersonalMenu;
        if (item === 'Персональный гид') summary += prisePersonalGuide;
        if (item === 'Улучшенная палатка') summary +=  priseImprovedTent;
    });

    if (dateForm !== '') {

        if (countForm === 0) {
            resultText.textContent = 'Укажите количество человек';
        } else {
            resultText.textContent = dateForm + ', ' + countForm + ' человек';
        }
    }

    if (summary !== 0) {
        resultSumm.textContent = summary.toLocaleString('ru-RU') + ' ₽';
    }
        
};

async function submit() {
    console.log('submit');
    let response = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        body: new FormData(bron)
    });

    let result = await response.json();
    console.log(result);
};

// слушатель     
bookingForm.addEventListener('click', (event) => {
    let target = event.target;
    
    // console.log(target);  
    // делегирование нажатие стрелки и btn  
    if (target.parentNode.classList.contains('booking__date')) {
        toggle('calc__date-fieldset');
    }

    if (target.parentNode.classList.contains('booking__count')) {        
        toggle('calc__count-fieldset');
    }

    if (target.parentNode.classList.contains('booking__options')) {
        toggle('calc__options-fieldset');
    }

    if (target.classList.contains('btn')) {
        event.preventDefault();
    }
// выбор даты 
    if (target.classList.contains('calc__date-btn')) {
        target.parentNode.querySelectorAll('.radio-input').forEach(item => {
            
            if (item.checked) {                
                toggle('calc__date-fieldset');                
                formSpan(item.value, 'booking__date');                
            }
        });
        
    }
// выбор количество человека
    if (target.classList.contains('calc__count-input')) {
        toggle('calc__count-fieldset');
        formSpan(target.value, 'booking__count');        
    }

// выбор опции 
    if(target.parentNode.classList.contains('calc__options-fieldset')) {
        
        if (target.classList.contains('calc__options-btn')) {
            optionsForm = [];
            target.parentNode.querySelectorAll('.calc__options-input').forEach(item => {
                
                if (item.checked) {
                    optionsForm.push(item.value);
                }
            });
    
            
            if (optionsForm.length > 0) {
                toggle('calc__options-fieldset');
                formSpan(optionsForm, 'booking__options');
            } else {
                optionsForm.push('Выбирите нужные опции');
                toggle('calc__options-fieldset');
                formSpan(optionsForm, 'booking__options');
            }            
        }
    }


    formSumm();

    if (target.classList.contains('booking__btn')) {
        console.log('booking__btn');

        let fio = valid(bookingInputFio, regexpFio);
        console.log('fio: ', fio);
        let email = valid(bookingInputEmail, regexpEmail); //работает
        console.log('email: ', email);
        let tel = valid(bookingInputTel, regexpTel); //работает
        console.log('tel: ', tel);
        
        if (fio && email && tel) {
            console.log('to submit');
            submit();
        }

    }
});

bookingForm.addEventListener('input', (event) => {
    let btn = bookingForm.querySelector('.booking__btn');

    if (dateForm !== '' && countForm !== 0 && bookingInputFio.value !== '' && bookingInputEmail.value !== '' && bookingInputTel.value !== '') {
        
        btn.removeAttribute('disabled'); 
    } else {
        if (!btn.hasAttribute('disabled')) {
            btn.setAttribute('disabled', 'disabled'); 
        }        
    }
});