import './style/paymantsLine.css';

import createElement from '../createElement/createElement';
import visa from './img/visa.png';
import mastercard from './img/mastercard.png';
import unionpay from './img/unionpay.png';
import mir from './img/mir.png';
import other from './img/card.png';

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
    const paymantsLine = createElement({
      name: 'ul',
      classes: [PaymantsLine.paymantsSel],
    });

    const paymants = [['visa', visa], ['masterCard', mastercard], ['unionPay', unionpay], ['mir', mir], ['other', other]];
    paymants.forEach((paymant) => {
      const namePay = paymant[0];
      const icon = paymant[1];

      const paymantEl = createElement({
        name: 'li',
        classes: [PaymantsLine.paymantItemSel, `${PaymantsLine.paymantItemSel}_${namePay}`],
      });
      const paymantIconEl = createElement({
        name: 'img',
        classes: [PaymantsLine.paymantIconSel],
        attributes: [
          { name: 'src', value: icon },
        ],
      });

      paymantEl.appendChild(paymantIconEl);
      paymantsLine.appendChild(paymantEl);
    });

    this.list = paymantsLine;
  }
}

export default PaymantsLine;
