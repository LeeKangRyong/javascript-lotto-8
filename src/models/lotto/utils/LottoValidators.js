import { NumberValidator, WoowaError } from '../../../shared/index.js';
import { LOTTO, LOTTO_ERROR } from './LottoConstants.js';
class LottoValidator {
    static #isvalidLottoLength(winningNumbers) {
        return winningNumbers.length === LOTTO.COUNTS;
    }

    static #isValidLottoNumber(number) {
        return number >= LOTTO.START && number <= LOTTO.END;
    }

    static #isDuplicatedLottoNumberExists(winningNumbers) {
        return new Set(winningNumbers).size !== 6;
    }

    static isValidWinningNumbers(winningNumbers) {
        if (!this.#isvalidLottoLength(winningNumbers)) throw new WoowaError(LOTTO_ERROR.SIX_NUMBERS);
        if (this.#isDuplicatedLottoNumberExists(winningNumbers)) throw new WoowaError(LOTTO_ERROR.DUPLICATED_NUMBER_EXISTS);

        for (let winningNumber of winningNumbers) {
            NumberValidator.isValidPositiveIntegerNumber(winningNumber);
            if (!this.#isValidLottoNumber(winningNumber)) throw new WoowaError(LOTTO_ERROR.INVALID_RANGE);
        }
    }

    static isValidBonusNumber(bonusNumber) {
        NumberValidator.isValidPositiveIntegerNumber(bonusNumber);
        if (!this.#isValidLottoNumber(bonusNumber)) throw new WoowaError(LOTTO_ERROR.INVALID_RANGE);
    }
}

export { LottoValidator };