import './style/cardForm.css';

import createElement from '../createElement/createElement';

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
    const form = createElement({
      name: 'form',
      classes: [CardForm.formSel],
    });
    const input = createElement({
      name: 'input',
      classes: [CardForm.inputSel],
      attributes: [
        { name: 'placeholder', value: 'Enter your card number' },
      ],
    });

    const subBtn = createElement({
      name: 'button',
      classes: [CardForm.submitSel],
      text: 'Submit',
      attributes: [
        { name: 'disabled', value: 'true' },
      ],
    });

    form.appendChild(input);
    form.appendChild(subBtn);
    this.form = form;
  }
}

export default CardForm;
