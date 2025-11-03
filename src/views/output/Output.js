import { MissionUtils } from "@woowacourse/mission-utils";
import { OUTPUT, OUTPUT_CALCULATOR, OutputFormatter } from "../index.js";
import { CALCULATOR, CALCULATOR_PRICE } from "../../models/index.js";
import { WoowaError, ERROR_PREFIX } from "../../shared/index.js";

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
      let sortedLotto = OutputFormatter.sortLottobyAsc(lotto);
      MissionUtils.Console.print(
        `[${sortedLotto.join(OUTPUT.LOTTO_SPLITTER)}]`
      );
    }
    this.printSpace();
  }

  static #calculatorDetailResult(
    matchingNumberCounts,
    matchingPrice,
    matchingCounts
  ) {
    return `${matchingNumberCounts}${
      OUTPUT_CALCULATOR.MATCHING
    } (${OutputFormatter.formatPrice(matchingPrice)}${
      OUTPUT_CALCULATOR.PRICE_UNIT
    }) - ${matchingCounts}${OUTPUT_CALCULATOR.MATCHING_COUNTS}`;
  }

  static #calculatorBonusDetailResult(
    matchingNumberCounts,
    matchingPrice,
    matchingCounts
  ) {
    return `${matchingNumberCounts}${OUTPUT_CALCULATOR.MATCHING}, ${
      OUTPUT_CALCULATOR.BONUS
    } (${OutputFormatter.formatPrice(matchingPrice)}${
      OUTPUT_CALCULATOR.PRICE_UNIT
    }) - ${matchingCounts}${OUTPUT_CALCULATOR.MATCHING_COUNTS}`;
  }

  static printCalculatorResult(lottoResult) {
    this.printCalculatorHeader();

    MissionUtils.Console.print(
      this.#calculatorDetailResult(
        CALCULATOR.THREE,
        CALCULATOR_PRICE.THREE_PRICE,
        lottoResult[CALCULATOR.THREE]
      )
    );
    MissionUtils.Console.print(
      this.#calculatorDetailResult(
        CALCULATOR.FOUR,
        CALCULATOR_PRICE.FOUR_PRICE,
        lottoResult[CALCULATOR.FOUR]
      )
    );
    MissionUtils.Console.print(
      this.#calculatorDetailResult(
        CALCULATOR.FIVE,
        CALCULATOR_PRICE.FIVE_PRICE,
        lottoResult[CALCULATOR.FIVE]
      )
    );
    MissionUtils.Console.print(
      this.#calculatorBonusDetailResult(
        CALCULATOR.FIVE,
        CALCULATOR_PRICE.FIVE_BONUS_PRICE,
        lottoResult[CALCULATOR.FIVE_BONUS]
      )
    );
    MissionUtils.Console.print(
      this.#calculatorDetailResult(
        CALCULATOR.SIX,
        CALCULATOR_PRICE.SIX_PRICE,
        lottoResult[CALCULATOR.SIX]
      )
    );
  }

  static printTotalProfitResult(totalProfit) {
    MissionUtils.Console.print(
      `${OUTPUT_CALCULATOR.PROFIT_HEADER} ${OutputFormatter.formatProfit(
        totalProfit
      )}${OUTPUT_CALCULATOR.PROFIT_FOOTER}`
    );
  }

  static printError(errorMessage) {
    if (errorMessage instanceof WoowaError) {
      MissionUtils.Console.print(errorMessage.message);
      return;
    }
    MissionUtils.Console.print(`${ERROR_PREFIX} ${errorMessage.message}`);
  }
}

export { Output };
