import { WoowaError } from '../../index.js';
import { NUMBER_ERROR } from './NumberConstants.js';

class NumberValidator {
    static #isNumber(num) {
        return typeof(num) === 'number' && !isNaN(num);
    }

    static #isInteger(num) {
        return Number.isInteger(num);
    }

    static #isPositive(num) {
        return num > 0;
    }

    static #isNonNegative(num) {
        return num >= 0;
    }

    static isValidPositiveIntegerNumber(num) {
        if (!this.#isNumber(num)) throw new WoowaError(NUMBER_ERROR.NON_NUMBER);
        if (!this.#isInteger(num)) throw new WoowaError(NUMBER_ERROR.NON_INTEGER_NUMBER);
        if (!this.#isPositive(num)) throw new WoowaError(NUMBER_ERROR.NON_POSITIVE_NUMBER);

        return true;
    }

    static isValidNonNegativeIntegerNumber(num) {
        if (!this.#isNumber(num)) throw new WoowaError(NUMBER_ERROR.NON_NUMBER);
        if (!this.#isInteger(num)) throw new WoowaError(NUMBER_ERROR.NON_INTEGER_NUMBER);
        if (!this.#isNonNegative(num)) throw new WoowaError(NUMBER_ERROR.NON_POSITIVE_NUMBER);

        return true;
    }

    static isValidNonNegativeNumber(num) {
        if (!this.#isNumber(num)) throw new WoowaError(NUMBER_ERROR.NON_NUMBER);
        if (!this.#isNonNegative(num)) throw new WoowaError(NUMBER_ERROR.NON_POSITIVE_NUMBER);
        
        return true;
    }
}

export { NumberValidator };