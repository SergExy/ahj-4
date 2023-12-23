import './style/cardValidator.css';

import createElement from '../createElement/createElement';
import CardForm from '../cardForm/cardForm';
import PaymantsLine from '../paymantsLine/paymantsLine';

class CardValidator {
  constructor(parent) {
    if (typeof (parent) === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
  }

  bindToDOM() {
    this.paymantsLine = new PaymantsLine();
    this.cardForm = new CardForm();

    const cardValidator = createElement({
      name: 'div',
      classes: ['cardValidator'],
    });
    const paymantsWrapper = createElement({
      name: 'div',
      classes: ['cardValidator__paymants'],
    });
    paymantsWrapper.appendChild(this.paymantsLine.list);
    cardValidator.appendChild(paymantsWrapper);

    const formWrapper = createElement({
      name: 'div',
      classes: ['cardValidator__form'],
    });
    const formEl = this.cardForm.form;

    const inputEl = formEl.querySelector(CardForm.inputSel);
    const subBtnEl = formEl.querySelector(CardForm.submitSel);
    inputEl.addEventListener('input', (e) => {
      const activePaymantType = this.parent.querySelector(PaymantsLine.paymantItemAciveSel);
      if (activePaymantType) {
        activePaymantType.classList.remove(PaymantsLine.paymantItemAciveSel.replace(/^./, ''));
      }
      inputEl.classList.remove(CardForm.inputInvalidSel.replace(/^./, ''));
      inputEl.classList.remove(CardForm.inputValidSel.replace(/^./, ''));

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

    formEl.addEventListener('submit', (e) => this.onSubmit(e));

    formWrapper.appendChild(formEl);
    cardValidator.appendChild(formWrapper);
    this.parent.appendChild(cardValidator);
  }

  onSubmit(e) {
    e.preventDefault();
    const inputEl = this.parent.querySelector(CardForm.inputSel);
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
      inputEl.classList.add(CardForm.inputInvalidSel.replace(/^\./, ''));
      return false;
    }

    const paymantsEl = this.parent.querySelector(PaymantsLine.paymantsSel);
    let paymnantTypeEL;
    switch (true) {
      case /^2/.test(cardNum): {
        paymnantTypeEL = paymantsEl.querySelector(`${PaymantsLine.paymantItemSel}_mir`);
        break;
      }
      case /^4/.test(cardNum): {
        paymnantTypeEL = paymantsEl.querySelector(`${PaymantsLine.paymantItemSel}_visa`);
        break;
      }
      case (/^(51|52|53|54|55)/.test(cardNum)): {
        paymnantTypeEL = paymantsEl.querySelector(`${PaymantsLine.paymantItemSel}_masterCard`);
        break;
      }
      case /^62/.test(cardNum): {
        paymnantTypeEL = paymantsEl.querySelector(`${PaymantsLine.paymantItemSel}_unionPay`);
        break;
      }
      default:
        paymnantTypeEL = paymantsEl.querySelector(`${PaymantsLine.paymantItemSel}_other`);
        break;
    }
    if (paymantsEl) {
      paymnantTypeEL.classList.add(PaymantsLine.paymantItemAciveSel.replace(/^./, ''));
    }

    return inputEl.classList.add(CardForm.inputValidSel.replace(/^\./, ''));
  }
}

export default CardValidator;
