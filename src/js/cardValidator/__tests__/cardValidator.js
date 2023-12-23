/**
* @jest-environment jsdom
*/

import CardValidator from '../cardValidator';
import CardForm from '../../cardForm/cardForm';
import PaymantsLine from '../../paymantsLine/paymantsLine';

let doc;
beforeEach(() => {
  doc = document.implementation.createHTMLDocument();
});

test('test bind cardValidator to DOM', () => {
  const body = doc.querySelector('body');
  const cardvalidator = new CardValidator(body);
  cardvalidator.bindToDOM();
  const cardValidator = body.querySelector('.cardValidator');
  expect(cardValidator).not.toBeNull();
});

test('test add classes on icon after submit form', () => {
  const body = doc.querySelector('body');
  const cardvalidator = new CardValidator(body);
  cardvalidator.bindToDOM();

  const input = body.querySelector(CardForm.inputSel);
  input.value = '4539082808450035';

  const subBtn = body.querySelector(CardForm.submitSel);
  subBtn.removeAttribute('disabled');
  subBtn.click();

  const visaEl = body.querySelector(`${PaymantsLine.paymantItemSel}_visa`);
  const result = visaEl.classList.contains(PaymantsLine.paymantItemAciveSel.replace(/^./, ''));
  expect(result).toBe(true);
});

test('test add classes invalid after submit form', () => {
  const body = doc.querySelector('body');
  const cardvalidator = new CardValidator(body);
  cardvalidator.bindToDOM();

  const input = body.querySelector(CardForm.inputSel);
  input.value = '0000111100001111';

  const subBtn = body.querySelector(CardForm.submitSel);
  subBtn.removeAttribute('disabled');
  subBtn.click();

  const result = input.classList.contains(CardForm.inputInvalidSel.replace(/^./, ''));
  expect(result).toBe(true);
});

test('test add classes valid after submit form', () => {
  const body = doc.querySelector('body');
  const cardvalidator = new CardValidator(body);
  cardvalidator.bindToDOM();

  const input = body.querySelector(CardForm.inputSel);
  input.value = '4539082808450035';

  const subBtn = body.querySelector(CardForm.submitSel);
  subBtn.removeAttribute('disabled');
  subBtn.click();

  const result = input.classList.contains(CardForm.inputValidSel.replace(/^./, ''));
  expect(result).toBe(true);
});

test.each([
  ['4024007193313102', 'visa', true],
  ['5195572838733121', 'masterCard', true],
  ['6263015602047489', 'unionPay', true],
  ['2204310115492913', 'mir', true],
  ['3533441289207538', 'other', true],
  ['0000111122220000', 'other', false],
])('testing paymants method num %n name %s', (cardNum, cardName, expected) => {
  const body = doc.querySelector('body');
  const cardvalidator = new CardValidator(body);
  cardvalidator.bindToDOM();

  const input = body.querySelector(CardForm.inputSel);
  input.value = cardNum;

  const subBtn = body.querySelector(CardForm.submitSel);
  subBtn.removeAttribute('disabled');
  subBtn.click();

  const cardEl = body.querySelector(`${PaymantsLine.paymantItemSel}_${cardName}`);
  const result = cardEl.classList.contains(PaymantsLine.paymantItemAciveSel.replace(/^./, ''));
  expect(result).toBe(expected);
});
