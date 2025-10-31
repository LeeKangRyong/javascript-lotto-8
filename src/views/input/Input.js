import { MissionUtils } from "@woowacourse/mission-utils";
import { INPUT } from "./utils/InputConstants.js";

class Input {
    constructor() {}

    static async inputPurchasePrice() {
        const purchasePrice = await MissionUtils.Console.readLineAsync(INPUT.PURCHASE_PRICE);

        return +purchasePrice;
    }

    static inputWinningNumbers() {
        const winningNumbers = MissionUtils.Console.readLineAsync(INPUT.WINNING_NUMBERS);

        return winningNumbers;
    }

    static inputBonusNumber() {
        const bonusNumber = MissionUtils.Console.readLineAsync(INPUT.BONUS_NUMBER);

        return bonusNumber;
    }

};

export { Input };