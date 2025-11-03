import { LottoValidator } from '../index.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    LottoValidator.isValidWinningNumbers(numbers);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export { Lotto };