/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
   const result = document.querySelector('.calculating__result span');

   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = "female";
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }

   function initLocalSetings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }
      });
   }

   initLocalSetings('#gender div', 'calculating__choose-item_active');
   initLocalSetings('#activity div', 'calculating__choose-item_active');

   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____';
         return;
      }
      if (sex === "female") {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }
   calcTotal();

   function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {

         elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem("ratio", +e.target.getAttribute('data-ratio'));
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            elements.forEach(item => item.classList.remove(activeClass));
            e.target.classList.add(activeClass);

            calcTotal();
         });
      });
   }

   getStaticInformation('#gender div', 'calculating__choose-item_active');
   getStaticInformation('#activity div', 'calculating__choose-item_active');

   function getDinamicInformation(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
         if (input.value.match(/\D/i)) {
            input.value = input.value.replace(/\D/, "");
         }
         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;

            case 'weight':
               weight = +input.value;
               break;

            case 'age':
               age = +input.value;
               break;
         }
         calcTotal();
      });
   }
   getDinamicInformation('#height');
   getDinamicInformation('#weight');
   getDinamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards(){
   class MenuCart {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.transfer = 27;
         this.parent = document.querySelector(parentSelector);
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }
      render() {
         const element = document.createElement('div');
         if (this.classes.length === 0) {
            this.classes = 'menu__item';
            element.classList.add(this.classes);
         } else {
            this.classes.forEach(className => element.classList.add('menu__item', className,));
         }
         element.innerHTML = `
             <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
            `;
         this.parent.append(element);
      }
   }



   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourses)('http://localhost:3000/menu')
   .then(data =>{
      data.forEach(({img,altimg,title,descr,price}) =>{
         new MenuCart(img,altimg,title,descr,price,'.menu .container').render();
      });
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formSelector,modalTimeout){
   const forms = document.querySelectorAll(formSelector);

   const message = {
      loading: 'btn-status',
      success: 'Спасибо, мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => {
      bindPostData(item);
   });



   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         const btn = form.querySelector('button');
         btn.classList.add(message.loading);


         const formData =  new FormData(form);
         const json = Object.fromEntries(formData.entries());

         
         (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)

         .then((data) =>{
               console.log(data);
               showThanksMOdal(message.success);
               btn.classList.remove(message.loading);
         }).catch((data)=>{
            console.log(data);
            showThanksMOdal(message.failure);
         }).finally(()=>{
            form.reset();
         });
      });
   }
   function showThanksMOdal(message) {
      const previousModalDialog = document.querySelector('.modal__dialog');

      previousModalDialog.classList.add('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal',modalTimeout);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
   <div class="modal__content">
          <div class="modal__close" data-clothe>×</div>
          <div class="modal__title">${message}</div>
    </div>
   `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         previousModalDialog.classList.add('show');
         previousModalDialog.classList.remove('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
      }, 2000);
   }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "hideModal": () => (/* binding */ hideModal)
/* harmony export */ });

function showModal(modalSelector, modalTimeout) {
   const modal = document.querySelector(modalSelector);
   modal.classList.remove('hide');
   modal.classList.add('show');
   document.body.classList.add("scroll");//documnet overflow - hidden  or scroll
   console.log(modalTimeout);
   if(modalTimeout){
      clearTimeout(modalTimeout);
   }
}
function hideModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.classList.remove("scroll");//documnet overflow - hidden  or scroll
}


function modal(trigerSelector, modalSelector, modalTimeout) {
   const modalTriggers = document.querySelectorAll(trigerSelector),
      modal = document.querySelector(modalSelector);

   modalTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
         showModal(modalSelector,modalTimeout);
      });

   });
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal__close')) {
         hideModal(modalSelector);
      }
   });
   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         showModal(modalSelector, modalTimeout);
      }
   });

   document.addEventListener('scroll',showModalByscroll);
   function showModalByscroll(){
      if (document.body.offsetHeight < window.scrollY + document.documentElement.clientHeight + 100) {
          showModal(modalSelector, modalTimeout);
          document.removeEventListener('scroll',showModalByscroll);
      }
     
   }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totlalCounr, curentCounter, wraper, field}){
   const prevBtn = document.querySelector(prevArrow),
   slider = document.querySelector(container),
   nextBtn = document.querySelector(nextArrow),
   slides = document.querySelectorAll(slide),
   current = document.querySelector(curentCounter),
   total = document.querySelector(totlalCounr),
   slidesWreaper = document.querySelector(wraper),
   slidesField = document.querySelector(field),
   width = window.getComputedStyle(slidesWreaper).width,
   deletePX = number => +number.replace(/px/g,"");
let slideIndex = 1;
let offset = 0;

current.textContent = getZiro(slideIndex);
total.innerHTML = getZiro(slides.length);


   slidesField.style.width = 100 * slides.length + "%";
   slidesField.style.display  = "flex";
   slidesField.style.transition = "0.5s all";
   slidesWreaper.style.overflow = "hidden";

   slides.forEach(slide =>{
      slide.style.width = deletePX(width);
   });

   slider.style.position = "relative";

   const indicators = document.createElement('ol');
   const dots = [];
   indicators.classList.add("carousel-indicators");
   slider.append(indicators);

   for (let i = 0; i < slides.length; i++){
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to',i+1);
      dot.classList.add('dot');
      indicators.append(dot);
      if (i == 0){
         dot.style.opacity = 1;
      }
      dots.push(dot);
   }

   nextBtn.addEventListener('click',()=>{
      if(offset === deletePX(width) * (slides.length - 1)){
         offset = 0;
      }else{
         offset += deletePX(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if(slideIndex === slides.length){
         slideIndex = 1;
      }else{
         slideIndex++;
      }
      current.textContent = getZiro(slideIndex);
      addOpacity(dots);
   });

   prevBtn.addEventListener('click',()=>{
      if(offset === 0){
         offset = (deletePX(width) * (slides.length - 1));
      }else{
         offset -= deletePX(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if(slideIndex === 1){
         slideIndex = slides.length;
      }else{
         slideIndex--;
      }
      current.textContent = getZiro(slideIndex);
      addOpacity(dots);
   });

   dots.forEach(dot =>{
      dot.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = (deletePX(width) * (slideTo - 1));
            slidesField.style.transform = `translateX(-${offset}px)`;
            dots.forEach(dot => dot.style.opacity = '.5');
            addOpacity(dots);
      });
   });

   function addOpacity(arr){
      arr.forEach(item =>{
         item.style.opacity = '.5';
      });
      arr[slideIndex -1].style.opacity = 1;
   }
   function getZiro(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector,tabsActiveClass, itemsActiveClass) {
   const parent = document.querySelector(tabsParentSelector),
      tabs = document.querySelectorAll(tabsSelector),
      items = document.querySelectorAll(tabsContentSelector);

   function hide() {
      tabs.forEach(item => {
         item.classList.remove(tabsActiveClass);
      });
      items.forEach(item => {
         item.classList.remove(itemsActiveClass);
      });
   }
   function show(i = 0) {
      tabs[i].classList.add(tabsActiveClass);
      items[i].classList.add(itemsActiveClass);
   }

   parent.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hide();
               show(i);
            }
         });
      }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine){
   setClock(id, deadLine);

   function getTimeremaning(toEnd) {
      let difference = Date.parse(toEnd) - Date.parse(new Date());
      const days = Math.floor((difference / (1000 * 60 * 60 * 24))),
         hours = Math.floor((difference / (1000 * 60 * 60) % 24)),
         minutes = Math.floor((difference / 1000 / 60) % 60),
         seconds = Math.floor((difference / 1000) % 60);

      return {
         'total': difference,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZiro(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         deadLineInterval = setInterval(updateClock, 1000);
      updateClock();
      function updateClock() {
         const t = getTimeremaning(endtime);
         days.innerHTML = getZiro(t.days);
         hours.innerHTML = getZiro(t.hours);
         minutes.innerHTML = getZiro(t.minutes);
         seconds.innerHTML = getZiro(t.seconds);
         if (t.total <= 0) {
            clearInterval(deadLineInterval);
            days.innerHTML = '00';
            hours.innerHTML = "00";
            minutes.innerHTML = '00';
            seconds.innerHTML = "00";
         }
      }

   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResourses": () => (/* binding */ getResourses)
/* harmony export */ });
const postData = async(url, data) =>{
   const res = await fetch(url,{
      method: "POST",
      headers: {
         'Content-Type':"application/json"
      },
      body: JSON.stringify(data)
   });
   return await res.json();
};

const getResourses = async(url) =>{
   const res = await fetch(url);
   if(!res.ok){
      throw new Error(`could not fetch ${url}, status: ${res.status}`);
   }
   return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener('DOMContentLoaded', () => {
     const modalTimeout = setTimeout( ()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimeout), 50000);
      (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active','tabcontent-active');
      (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal', modalTimeout);
      (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-01-01');
      (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
      (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
      (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form',modalTimeout);
      (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
            container: '.offer__slider',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            slide: '.offer__slide',
            totlalCounr: '#total',
            field: '.offer__slide-inner',
            wraper: '.offer__slider-wrapper',
            curentCounter: '#current'

      });
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map