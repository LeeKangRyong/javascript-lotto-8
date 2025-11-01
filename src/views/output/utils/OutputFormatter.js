// src/views/output/utils/OutputFormatter.js
import { OUTPUT, OutputValidator } from '../../index.js';
class OutputFormatter {

    static sortLottobyAsc(lotto) {
        const sorted = lotto.sort((a, b) => a - b);        
        OutputValidator.isValidLottoFormat(sorted);
        
        return sorted;
    }

    static formatPrice(price) {
        const formattedPrice = [];
        let stringPrice = [...String(price)].reverse();
        const stringPriceLength = stringPrice.length;

        for (let i = 0; i < stringPriceLength-1; i++) {
            formattedPrice.push(stringPrice[i]);
            if (i >= 2 && i % 3 === 2) formattedPrice.push(OUTPUT.SPLITTER);
        }

        formattedPrice.push(stringPrice[stringPriceLength-1]);

        stringPrice = formattedPrice.reverse();
        const result = stringPrice.join('');
        
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