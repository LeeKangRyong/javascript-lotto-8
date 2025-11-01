import { Input, Output } from '../views/index.js';
import { Lotto, Purchase, LottoValidator, CalculatorValidator } from '../models/index.js';

class InputService {
    static async inputPurchase() {
        while (true) {
            try {
                const purchasePrice = await Input.inputPurchasePrice();
                const purchase = new Purchase(purchasePrice);
                
                return purchase;
            } catch (error) {
                Output.printError(error);
            }
        }
    }

    static async getWinningNumbers() {
        while (true) {
            try {
                const winningNumbers = await Input.inputWinningNumbers();
                const lotto = new Lotto(winningNumbers);

                return lotto.getNumbers();
            } catch (error) {
                Output.printError(error);
            }
        }
    }

    static async getBonusNumber(winningNumbers) {
        while (true) {
            try {
                const bonusNumber = await Input.inputBonusNumber();
                LottoValidator.isValidBonusNumber(bonusNumber);
                CalculatorValidator.isValidBonusNumber(winningNumbers, bonusNumber)

                return bonusNumber;
            } catch (error) {
                Output.printError(error);
            }
        }
    }
}

export { InputService };