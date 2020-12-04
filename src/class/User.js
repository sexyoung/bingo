import { getRandomChar } from "utils";

export class User {
  constructor() {
    let user = localStorage.getItem('bingoUser');
    if(!user) {
      user = JSON.stringify({id: this.getGUID()});
      localStorage.setItem('bingoUser', user);
    }
    const attr = JSON.parse(user);
    for (const key in attr) {
      this[key] = attr[key];
    }
  }

  getGUID(len = 32) {
    let result = '';
    for (let i = 0; i < len; i++) {
      result += getRandomChar();
      if(i % 8 === 7) result += '-';
    }
    return result.slice(0, result.length - 1);
  }
}