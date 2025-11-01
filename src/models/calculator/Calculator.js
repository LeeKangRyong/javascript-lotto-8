import { CALCULATOR, CALCULATOR_PRICE } from '../index.js';
class Calculator {
    #winningNumbers;
    #bonusNumber;

    constructor({ winningNumbers, bonusNumber }) {
        this.#winningNumbers = winningNumbers;
        this.#bonusNumber = bonusNumber;
    }

    #countMatchingLotto(lotto) {
        const matchingNumbers = lotto.filter(
            lottoNumber => this.#winningNumbers.includes(lottoNumber)
        );
        return matchingNumbers.length;
    }

    #hasBonusNumber(lotto) {
        return lotto.includes(this.#bonusNumber);
    }

    #getResultKey(matchCount, hasBonus) {
        if (matchCount === 3) return CALCULATOR.THREE;
        if (matchCount === 4) return CALCULATOR.FOUR;
        if (matchCount === 5 && hasBonus) return CALCULATOR.FIVE_BONUS;
        if (matchCount === 5) return CALCULATOR.FIVE;
        if (matchCount === 6) return CALCULATOR.SIX;
        return null;
    }

    calculateMatchingLottoResult(lottoResult, lotto) {
        const matchCount = this.#countMatchingLotto(lotto);
        const hasBonus = this.#hasBonusNumber(lotto);
        const resultKey = this.#getResultKey(matchCount, hasBonus);

        if (resultKey) {
            lottoResult[resultKey]++;
        }
        
        return lottoResult;
    }

    #calculateTotalProfit(lottoResult) {
        let totalProfit = 0;

        totalProfit += lottoResult[CALCULATOR.THREE] * CALCULATOR_PRICE.THREE_PRICE;
        totalProfit += lottoResult[CALCULATOR.FOUR] * CALCULATOR_PRICE.FOUR_PRICE;
        totalProfit += lottoResult[CALCULATOR.FIVE] * CALCULATOR_PRICE.FIVE_PRICE;
        totalProfit += lottoResult[CALCULATOR.FIVE_BONUS] * CALCULATOR_PRICE.FIVE_BONUS_PRICE;
        totalProfit += lottoResult[CALCULATOR.SIX] * CALCULATOR_PRICE.SIX_PRICE;

        return totalProfit;
    }

    calculateTotalProfitRate(lottoResult, purchasePrice) {
        let totalProfit = this.#calculateTotalProfit(lottoResult);

        return totalProfit / purchasePrice * 100;
    }
}

export { Calculator };