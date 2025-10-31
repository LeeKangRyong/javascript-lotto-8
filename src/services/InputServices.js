import { MissionUtils } from '@woowacourse/mission-utils';
import { Input } from '../views/index.js';
import { Lotto, Purchase } from '../models/index.js';

class InputService {
    static async getPurchasePrice() {
        while (true) {
            try {
                const purchasePrice = await Input.inputPurchasePrice();
                const purchase = new Purchase(purchasePrice);
                
                return purchase;
            } catch (error) {
                MissionUtils.Console.print(error.message);
            }
        }
    }

    static async getWinningNumbers() {
        while (true) {
            try {
                const winningNumbers = await Input.inputWinningNumbers();
                const lotto = new Lotto(winningNumbers);

                return lotto;
            } catch (error) {
                MissionUtils.Console.print(error.message);
            }
        }
    }

    static async getBonusNumber() {
        while (true) {
            try {
                const bonusNumber = await Input.inputBonusNumber();
                const lotto = new Lotto(bonusNumber);

                return bonusNumber;
            } catch (error) {
                MissionUtils.Console.print(error.message);
            }
        }
    }
}

export { InputService };