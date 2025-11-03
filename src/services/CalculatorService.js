import { CALCULATOR } from "../models/index.js";

class CalculatorService {
  static calculateLottoResult(calculator, lottoList) {
    const lottoResult = {
      [CALCULATOR.THREE]: 0,
      [CALCULATOR.FOUR]: 0,
      [CALCULATOR.FIVE]: 0,
      [CALCULATOR.FIVE_BONUS]: 0,
      [CALCULATOR.SIX]: 0,
    };

    for (let lotto of lottoList) {
      calculator.calculateMatchingLottoResult(lottoResult, lotto);
    }

    return lottoResult;
  }

  static calculateTotalProfit(calculator, lottoResult, purchasePrice) {
    return calculator.calculateTotalProfitRate(lottoResult, purchasePrice);
  }
}

export { CalculatorService };
