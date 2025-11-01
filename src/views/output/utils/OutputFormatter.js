import { OUTPUT, OutputValidator } from '../../index.js';
class OutputFormatter {

    static sortLottobyAsc(lotto) {
        const sorted = lotto.sort((a, b) => a - b);        
        OutputValidator.isValidLottoFormat(sorted);
        
        return sorted;
    }

    static formatPrice(price) {
        const stringPrice = String(price);
        const stringPriceLength = stringPrice.length;
        let result = '';
        
        for (let i = 0; i < stringPriceLength; i++) {
            if (i > 0 && (stringPriceLength - i) % 3 === 0) {
                result += OUTPUT.SPLITTER;
            }
            result += stringPrice[i];
        }
        
        OutputValidator.isValidPriceFormat(result);
        return result;
    }

    static formatProfit(profit) {
        const formatted = profit.toFixed(1);
        
        OutputValidator.isValidProfitFormat(formatted);
        
        return formatted;
    }
}

export { OutputFormatter };