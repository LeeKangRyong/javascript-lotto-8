import { MissionUtils } from '@woowacourse/mission-utils';
import { LOTTO, LottoValidator } from '../index.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    const splittedNumbers = this.#processNumbers(numbers);
    this.#validate(splittedNumbers);
    this.#numbers = splittedNumbers;
  }

  #processNumbers(numbers) {
    if (Array.isArray(numbers)) {
      return numbers; 
    }
    return this.#splitNumbers(numbers);
  }

  #splitNumbers(numbers) {
    const splitted = numbers.split(LOTTO.NUMBER_SPLITTER);
    return splitted.map(number => +number);
  }

  #validate(splittedNumbers) {
    LottoValidator.isValidWinningNumbers(splittedNumbers);
  }

  getNumbers() {
    return this.#numbers;
  }

  static getLotto() {
    return MissionUtils.Random.pickUniqueNumbersInRange(LOTTO.START, LOTTO.END, LOTTO.COUNTS);
  }
}

export { Lotto };
