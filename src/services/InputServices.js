import { Input, Output } from '../views/index.js';
import { Lotto, Purchase } from '../models/index.js';
import { LottoValidator } from '../models/index.js';

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

    static async getBonusNumber() {
        while (true) {
            try {
                const bonusNumber = await Input.inputBonusNumber();
                LottoValidator.isValidBonusNumber(bonusNumber);

                return bonusNumber;
            } catch (error) {
                Output.printError(error);
            }
        }
    }
}

export { InputService };