import { CALCULATOR_ERROR } from "./CalculatorConstants.js";
import { WoowaError } from "../../../shared/index.js";

class CalculatorValidator {
  static #isDuplicatedBonusNumber(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  }

  static isValidBonusNumber(winningNumbers, bonusNumber) {
    if (this.#isDuplicatedBonusNumber(winningNumbers, bonusNumber))
      throw new WoowaError(CALCULATOR_ERROR.DUPLICATED_BONUS_NUMBER);

    return true;
  }
}

export { CalculatorValidator };
