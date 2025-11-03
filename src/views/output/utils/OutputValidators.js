import { WoowaError } from '../../../shared/index.js';
import { OUTPUT, OUTPUT_FORMAT_ERROR } from './OutputConstants.js';

class OutputValidator {
    static #validatePriceParts(parts) {
        for (let i = 1; i < parts.length; i++) {
            if (parts[i].length !== 3) {
                throw new WoowaError(OUTPUT_FORMAT_ERROR.INVALID_PRICE_FORMAT);
            }
        }
    }

    static isValidLottoFormat(lotto) {
        for (let i = 0; i < lotto.length - 1; i++) {
            if (lotto[i] >= lotto[i + 1]) throw new WoowaError(OUTPUT_FORMAT_ERROR.INVALID_LOTTO_FORMAT);
        }

        return true;
    }

    static isValidPriceFormat(formattedPrice) {
        const priceParts = formattedPrice.split(OUTPUT.SPLITTER);
        
        if (priceParts[0].length > 3 || priceParts[0].length < 1) {
            throw new WoowaError(OUTPUT_FORMAT_ERROR.INVALID_PRICE_FORMAT);
        }
        
        this.#validatePriceParts(priceParts);
        
        return true;
    }

    static isValidProfitFormat(formattedProfit) {
        const decimalPart = formattedProfit.split(OUTPUT.DECIMAL_POINT)[1];
        
        if (decimalPart && decimalPart.length !== 1) throw new WoowaError(OUTPUT_FORMAT_ERROR.INVALID_PROFIT_FORMAT);
        
        return true;
    }
}

export { OutputValidator };