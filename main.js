/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/licenses.txt
const licenses_namespaceObject = __webpack_require__.p + "licenses.txt";
;// CONCATENATED MODULE: ./src/js/createElement/createElement.js
function createElement(options) {
  const {
    name,
    classes,
    text,
    attributes
  } = options;
  const element = document.createElement(name);
  if (classes) {
    classes.forEach(className => {
      element.classList.add(className[0] === '.' ? className.replace(/^\./, '') : className);
    });
  }
  if (text) {
    element.textContent = text;
  }
  if (attributes) {
    attributes.forEach(attr => {
      element.setAttribute(attr.name, attr.value);
    });
  }
  return element;
}
/* harmony default export */ const createElement_createElement = (createElement);
;// CONCATENATED MODULE: ./src/js/cardForm/cardForm.js


class CardForm {
  constructor() {
    this.formInit();
  }
  static get formSel() {
    return '.cardForm';
  }
  static get inputSel() {
    return '.cardForm__input';
  }
  static get inputValidSel() {
    return '.cardForm__input_valid';
  }
  static get inputInvalidSel() {
    return '.cardForm__input_invalid';
  }
  static get submitSel() {
    return '.cardForm__subBtn';
  }
  formInit() {
    const form = createElement_createElement({
      name: 'form',
      classes: [CardForm.formSel]
    });
    const input = createElement_createElement({
      name: 'input',
      classes: [CardForm.inputSel],
      attributes: [{
        name: 'placeholder',
        value: 'Enter your card number'
      }]
    });
    const subBtn = createElement_createElement({
      name: 'button',
      classes: [CardForm.submitSel],
      text: 'Submit',
      attributes: [{
        name: 'disabled',
        value: 'true'
      }]
    });
    form.appendChild(input);
    form.appendChild(subBtn);
    this.form = form;
  }
}
/* harmony default export */ const cardForm = (CardForm);
;// CONCATENATED MODULE: ./src/js/paymantsLine/img/visa.png
const visa_namespaceObject = __webpack_require__.p + "images/158aff2a7bf66e6cbbac.png";
;// CONCATENATED MODULE: ./src/js/paymantsLine/img/mastercard.png
const mastercard_namespaceObject = __webpack_require__.p + "images/7f45d5fbe0746242ec9d.png";
;// CONCATENATED MODULE: ./src/js/paymantsLine/img/unionpay.png
const unionpay_namespaceObject = __webpack_require__.p + "images/3077c89110517af99027.png";
;// CONCATENATED MODULE: ./src/js/paymantsLine/img/mir.png
const mir_namespaceObject = __webpack_require__.p + "images/af15acd2cc0ed22da6a2.png";
;// CONCATENATED MODULE: ./src/js/paymantsLine/img/card.png
const card_namespaceObject = __webpack_require__.p + "images/3a2bf990c85d12b0628b.png";
;// CONCATENATED MODULE: ./src/js/paymantsLine/paymantsLine.js







class PaymantsLine {
  constructor() {
    this.listInit();
  }
  static get paymantsSel() {
    return '.paymants';
  }
  static get paymantItemSel() {
    return '.paymants__item';
  }
  static get paymantItemAciveSel() {
    return '.paymants__item_active';
  }
  static get paymantIconSel() {
    return '.paymant__icon';
  }
  listInit() {
    const paymantsLine = createElement_createElement({
      name: 'ul',
      classes: [PaymantsLine.paymantsSel]
    });
    const paymants = [['visa', visa_namespaceObject], ['masterCard', mastercard_namespaceObject], ['unionPay', unionpay_namespaceObject], ['mir', mir_namespaceObject], ['other', card_namespaceObject]];
    paymants.forEach(paymant => {
      const namePay = paymant[0];
      const icon = paymant[1];
      const paymantEl = createElement_createElement({
        name: 'li',
        classes: [PaymantsLine.paymantItemSel, `${PaymantsLine.paymantItemSel}_${namePay}`]
      });
      const paymantIconEl = createElement_createElement({
        name: 'img',
        classes: [PaymantsLine.paymantIconSel],
        attributes: [{
          name: 'src',
          value: icon
        }]
      });
      paymantEl.appendChild(paymantIconEl);
      paymantsLine.appendChild(paymantEl);
    });
    this.list = paymantsLine;
  }
}
/* harmony default export */ const paymantsLine = (PaymantsLine);
;// CONCATENATED MODULE: ./src/js/cardValidator/cardValidator.js




class CardValidator {
  constructor(parent) {
    if (typeof parent === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
  }
  bindToDOM() {
    this.paymantsLine = new paymantsLine();
    this.cardForm = new cardForm();
    const cardValidator = createElement_createElement({
      name: 'div',
      classes: ['cardValidator']
    });
    const paymantsWrapper = createElement_createElement({
      name: 'div',
      classes: ['cardValidator__paymants']
    });
    paymantsWrapper.appendChild(this.paymantsLine.list);
    cardValidator.appendChild(paymantsWrapper);
    const formWrapper = createElement_createElement({
      name: 'div',
      classes: ['cardValidator__form']
    });
    const formEl = this.cardForm.form;
    const inputEl = formEl.querySelector(cardForm.inputSel);
    const subBtnEl = formEl.querySelector(cardForm.submitSel);
    inputEl.addEventListener('input', e => {
      const activePaymantType = this.parent.querySelector(paymantsLine.paymantItemAciveSel);
      if (activePaymantType) {
        activePaymantType.classList.remove(paymantsLine.paymantItemAciveSel.replace(/^./, ''));
      }
      inputEl.classList.remove(cardForm.inputInvalidSel.replace(/^./, ''));
      inputEl.classList.remove(cardForm.inputValidSel.replace(/^./, ''));
      let newValue = e.target.value;
      if (newValue.replace(/[\D]/g, '').length > 16) {
        newValue = newValue.slice(0, 19);
      }
      if (newValue.replace(/[\D]/g, '').length === 16) {
        subBtnEl.removeAttribute('disabled');
      } else {
        subBtnEl.setAttribute('disabled', true);
      }
      if (/[\D]/.test(e.target.value)) {
        newValue = newValue.replace(/[\D]/g, '');
      }
      inputEl.value = newValue.replace(/(\S{4})(?=\S)/g, '$1 ');
    });
    formEl.addEventListener('submit', e => this.onSubmit(e));
    formWrapper.appendChild(formEl);
    cardValidator.appendChild(formWrapper);
    this.parent.appendChild(cardValidator);
  }
  onSubmit(e) {
    e.preventDefault();
    const inputEl = this.parent.querySelector(cardForm.inputSel);
    const cardNum = inputEl.value.replace(/[\D]/g, '');
    const ccns = [...cardNum];
    const checkCard = ccns.reduce((sum, ccn, i) => {
      let digit = Number(ccn);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      return sum + digit;
    }, 0);
    if (checkCard % 10) {
      inputEl.classList.add(cardForm.inputInvalidSel.replace(/^\./, ''));
      return false;
    }
    const paymantsEl = this.parent.querySelector(paymantsLine.paymantsSel);
    let paymnantTypeEL;
    switch (true) {
      case /^2/.test(cardNum):
        {
          paymnantTypeEL = paymantsEl.querySelector(`${paymantsLine.paymantItemSel}_mir`);
          break;
        }
      case /^4/.test(cardNum):
        {
          paymnantTypeEL = paymantsEl.querySelector(`${paymantsLine.paymantItemSel}_visa`);
          break;
        }
      case /^(51|52|53|54|55)/.test(cardNum):
        {
          paymnantTypeEL = paymantsEl.querySelector(`${paymantsLine.paymantItemSel}_masterCard`);
          break;
        }
      case /^62/.test(cardNum):
        {
          paymnantTypeEL = paymantsEl.querySelector(`${paymantsLine.paymantItemSel}_unionPay`);
          break;
        }
      default:
        paymnantTypeEL = paymantsEl.querySelector(`${paymantsLine.paymantItemSel}_other`);
        break;
    }
    if (paymantsEl) {
      paymnantTypeEL.classList.add(paymantsLine.paymantItemAciveSel.replace(/^./, ''));
    }
    return inputEl.classList.add(cardForm.inputValidSel.replace(/^\./, ''));
  }
}
/* harmony default export */ const cardValidator_cardValidator = (CardValidator);
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const cardValidator = new cardValidator_cardValidator(body);
  cardValidator.bindToDOM();
});
;// CONCATENATED MODULE: ./src/index.js



/******/ })()
;