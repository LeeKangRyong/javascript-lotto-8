import { OUTPUT } from './OutputConstants.js';
class OutputFormatter {

    // lotto format (오름차순으로 정렬하기)
    static sortLottobyAsc(lotto) {
        return lotto.sort((a, b) => a - b);
    }

    // money format (, 넣어주기)
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

        return stringPrice.join('');
    }

    // 수익률 format (둘째 자리에서 반올림하기, model에서 계산은 정확히)
}

export { OutputFormatter };