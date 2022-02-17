const bookingForm = document.querySelector('.booking__form'),
    bookingInputFio = document.querySelector('.booking__input_fio'),
    bookingInputEmail = document.querySelector('.booking__input_email'),
    bookingInputTel = document.querySelector('.booking__input_tel'),
    resultText = bookingForm.querySelector('.booking__result-text'),
    resultSumm = bookingForm.querySelector('.booking__result-sum'),
    regexpFio = /^[а-яА-ЯёЁa-zA-Z ]+$/,
    regexpEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
    regexpTel = /^\d[\d\(\)\ -]{4,14}\d$/,
    priseOnePerson = 45000, 
    priseBabySitter = 2000,
    prisePersonalMenu = 5000,
    prisePersonalGuide = 9000,
    priseImprovedTent = 15000;

let dateForm = '',
    countForm = 0,
    optionsForm = [];

function valid(item, regExp) {
    return regExp.test(item.value);
};

const formSpan = (value, className, close = false) => {    
    const calcClassName = bookingForm.querySelector(`.${className}`);
    
    if (close) {

        if (className === 'booking__date') calcClassName.querySelector('.tour__span').textContent = 'Выбирите дату путешествия';
        if (className === 'booking__count') calcClassName.querySelector('.tour__span').textContent = 'Укажите количество человек';
        if (className === 'booking__options') calcClassName.querySelector('.tour__span').textContent = 'Выбирите нужные опции';
        return;
    }

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'booking__count') {
        countForm = value;        
        calcClassName.querySelector('.tour__span').textContent = countForm + ' человек';
    }

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'booking__date') {
        dateForm = value;        
        calcClassName.querySelector('.tour__span').textContent = dateForm;
    }

    if (calcClassName.querySelector('.tour__span').textContent !== value && className === 'booking__options') {
        
        calcClassName.querySelector('.tour__span').textContent = value.join(', ');
    }    

    
};

const toggle = (className) => {     
    const tagClass = bookingForm.querySelector(`.${className}`);
    tagClass.classList.toggle(className + '_active');
};

const formSumm = () => {    
    // const resultText = bookingForm.querySelector('.booking__result-text'),
    //     resultSumm = bookingForm.querySelector('.booking__result-sum');

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

function resetAll() {
    bookingForm.reset();
    dateForm = '',
    countForm = 0,
    optionsForm = [];
    resultText.textContent = 'Выбирите дату путешествия';
    resultSumm.textContent = 'Итог';
    formSpan(0, 'booking__date', true);
    formSpan(0, 'booking__count', true);
    formSpan(0, 'booking__options', true);
    bookingForm.querySelector('.booking__btn').setAttribute('disabled', 'disabled');
}

async function submit() {
    
    const p = document.createElement('p');
        p.className = 'massege';
        p.style.cssText = 'position: absolute; bottom: 50%; padding: 20px 20px; background-color: #FCB500; border: 2px solid #FCB500; border-radius: 10px; left: calc(50% - 160px);';
    const formData = Object.fromEntries(new FormData(bron));

    let response = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // отправляемые данные 
        },
        body: JSON.stringify(formData)
    });
    
    if (response.ok) {
        p.textContent = 'Ваше сообщение направленно ';
        resetAll();
    } else {
        p.textContent = 'Что-то пошло не так, попробуйте позже';
    }

    bookingForm.querySelector('.booking__fieldset').append(p);

    setTimeout(() =>{
        bookingForm.querySelector('.massege').remove();
    }, 3000);

    let result = await response.json();
    console.log(result);
};

const noValid = (item) => {
    let p = document.createElement('p');
        p.className = 'no-valid';
        p.style.cssText = 'position: absolute;  bottom: 0; color: red';        
        
    if (item.classList.contains('booking__input_fio')) p.textContent = 'Введите правильно ФИО';
    if (item.classList.contains('booking__input_email')) p.textContent = 'Введите правильно email';
    if (item.classList.contains('booking__input_tel')) p.textContent = 'Введите правильно телефон';
    
    item.parentNode.style.border = '1px solid red';
    item.parentNode.style.cssText = 'border: 1px solid red; position: relative;';
    item.parentNode.append(p);

    setTimeout(() =>{
        item.parentNode.style.cssText = '';
        item.parentNode.querySelector('.no-valid').remove();
    }, 3000);
};

// слушатель     
bookingForm.addEventListener('click', (event) => {
    let target = event.target;
        
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

        const fio = valid(bookingInputFio, regexpFio),        
            email = valid(bookingInputEmail, regexpEmail),
            tel = valid(bookingInputTel, regexpTel);
                
        if (!fio) noValid(bookingInputFio);
        if (!email) noValid(bookingInputEmail);
        if (!tel) noValid(bookingInputTel);
        if (fio && email && tel) submit();
        

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