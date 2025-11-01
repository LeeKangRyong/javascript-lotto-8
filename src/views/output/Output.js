import { MissionUtils } from "@woowacourse/mission-utils";
import { OUTPUT, OUTPUT_CALCULATOR, OutputFormatter } from '../index.js';
import { CALCULATOR, CALCULATOR_PRICE } from '../../models/index.js';
import { WoowaError, ERROR_PREFIX } from '../../shared/index.js';

class Output {
    constructor() {}
    
    static printSpace() {
        MissionUtils.Console.print(OUTPUT.SPACE);
    }

    static printCalculatorHeader() {
        this.printSpace();
        MissionUtils.Console.print(OUTPUT.CALCULATOR_HEADER);
    }

    static printPurchaseCounts(purchaseCounts) {
        this.printSpace();
        MissionUtils.Console.print(`${purchaseCounts}${OUTPUT.PURCHASE_COUNTS}`);
    }

    static printLottoList(lottoList, purchaseCounts) {
        for (let lotto of lottoList) {
            MissionUtils.Console.print(OutputFormatter.sortLottobyAsc(lotto));
        }
        this.printSpace();
    }

    static #calculatorDetailResult(matchingNumberCounts, matchingPrice) {
        return `${matchingNumberCounts}${OUTPUT_CALCULATOR.MATCHING} (${OutputFormatter.formatPrice(matchingPrice)}${OUTPUT_CALCULATOR.PRICE_UNIT}) - 0${OUTPUT_CALCULATOR.MATCHING_COUNTS}`;
    }

    static #calculatorBonusDetailResult(matchingNumberCounts, matchingPrice) {
        return `${matchingNumberCounts}${OUTPUT_CALCULATOR.MATCHING}, ${OUTPUT_CALCULATOR.BONUS} (${OutputFormatter.formatPrice(matchingPrice)}${OUTPUT_CALCULATOR.PRICE_UNIT}) - 0${OUTPUT_CALCULATOR.MATCHING_COUNTS}`;
    }

    static printCalculatorResult(price) {
        this.printCalculatorHeader();
        const formattedPrice = OutputFormatter.formatPrice(price);
        MissionUtils.Console.print(this.#calculatorDetailResult(CALCULATOR.THREE, CALCULATOR_PRICE.THREE_PRICE));
        MissionUtils.Console.print(this.#calculatorDetailResult(CALCULATOR.FOUR, CALCULATOR_PRICE.FOUR_PRICE));
        MissionUtils.Console.print(this.#calculatorDetailResult(CALCULATOR.FIVE, CALCULATOR_PRICE.FIVE_PRICE));
        MissionUtils.Console.print(this.#calculatorBonusDetailResult(CALCULATOR.FIVE, CALCULATOR_PRICE.FIVE_BONUS_PRICE));
        MissionUtils.Console.print(this.#calculatorDetailResult(CALCULATOR.SIX, CALCULATOR_PRICE.SIX_PRICE));
    }

    static printError(errorMessage) {
        if (errorMessage instanceof WoowaError) {
            MissionUtils.Console.print(errorMessage.message);
            return;
        }
        MissionUtils.Console.print(`${ERROR_PREFIX} ${errorMessage.message}`);
    }
};

export { Output };