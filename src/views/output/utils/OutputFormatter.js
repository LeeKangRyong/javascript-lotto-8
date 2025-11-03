import { OutputValidator } from "../../index.js";

class OutputFormatter {
  static sortLottobyAsc(lotto) {
    return [...lotto].sort((a, b) => a - b);
  }

  static formatPrice(price) {
    return price.toLocaleString("ko-KR");
  }

  static formatProfit(profit) {
    const formatted = profit.toFixed(1);
    OutputValidator.isValidProfitFormat(formatted);

    return formatted;
  }
}

export { OutputFormatter };
