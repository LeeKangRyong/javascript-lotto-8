import { MissionUtils } from "@woowacourse/mission-utils";
import { INPUT } from "./utils/InputConstants.js";

class Input {
    constructor() {}

    static async inputPurchasePrice() {
        const purchasePrice = await MissionUtils.Console.readLineAsync(INPUT.PURCHASE_PRICE);

        return +purchasePrice;
    }

    static async inputWinningNumbers() {
        const winningNumbers = await MissionUtils.Console.readLineAsync(INPUT.WINNING_NUMBERS);

        return winningNumbers;
    }

    static async inputBonusNumber() {
        const bonusNumber = await MissionUtils.Console.readLineAsync(INPUT.BONUS_NUMBER);

        return +bonusNumber;
    }

};

export { Input };