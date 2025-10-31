import { NumberValidator, WoowaError } from '../../../shared/index.js';
import { LOTTO, LOTTO_ERROR } from './LottoConstants.js';
class LottoValidator {
    static #isvalidLottoLength(winningNumbers) {
        return winningNumbers.length === LOTTO.COUNTS;
    }

    static #isValidLottoNumber(number) {
        return number >= LOTTO.START && number <= LOTTO.END;
    }

    static isValidWinningNumbers(winningNumbers) {
        if (!this.#isvalidLottoLength(winningNumbers)) throw new WoowaError(LOTTO_ERROR.SIX_NUMBERS);
        for (let winningNumber of winningNumbers) {
            NumberValidator.isValidPositiveIntegerNumber(winningNumber);
            if (!this.#isValidLottoNumber(winningNumber)) throw new WoowaError(LOTTO_ERROR.INVALID_RANGE);
        }
    }
}

export { LottoValidator };