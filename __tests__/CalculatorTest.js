import {
  CalculatorValidator,
  CALCULATOR_ERROR,
  Calculator,
  CALCULATOR,
} from "../src/models/index.js";
import { CalculatorService } from "../src/services/index.js";
import { checkErrorMessage } from "../src/shared/index.js";

describe("계산기 클래스 테스트", () => {
  const validWinningNumbers = [1, 2, 3, 4, 5, 6];

  describe("보너스 번호 정상 테스트", () => {
    test("1. 당첨 번호와 중복되지 않는 보너스 번호로 잘 작동하는 지 확인한다.", () => {
      expect(() => {
        CalculatorValidator.isValidBonusNumber(validWinningNumbers, 22);
      }).not.toThrow();
    });
  });

  describe("보너스 번호 예외 테스트", () => {
    test("1. 보너스 번호가 당첨 번호와 중복되면 예외가 발생한다.", () => {
      expect(() => {
        CalculatorValidator.isValidBonusNumber(validWinningNumbers, 3);
      }).toThrow(checkErrorMessage(CALCULATOR_ERROR.DUPLICATED_BONUS_NUMBER));
    });
  });

  describe("CalculatorService 테스트", () => {
    test("1. 로또 결과를 정상적으로 계산하는지 확인한다.", () => {
      const calculator = new Calculator({
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      });
      const lottoList = [
        [1, 2, 3, 8, 9, 10],
        [1, 2, 3, 4, 8, 9],
        [1, 2, 3, 4, 5, 8],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 6],
      ];

      const result = CalculatorService.calculateLottoResult(
        calculator,
        lottoList
      );

      expect(result[CALCULATOR.THREE]).toBe(1);
      expect(result[CALCULATOR.FOUR]).toBe(1);
      expect(result[CALCULATOR.FIVE]).toBe(1);
      expect(result[CALCULATOR.FIVE_BONUS]).toBe(1);
      expect(result[CALCULATOR.SIX]).toBe(1);
    });

    test("2. 총 수익률을 정상적으로 계산하는지 확인한다.", () => {
      const calculator = new Calculator({
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      });
      const lottoResult = {
        [CALCULATOR.THREE]: 1,
        [CALCULATOR.FOUR]: 0,
        [CALCULATOR.FIVE]: 0,
        [CALCULATOR.FIVE_BONUS]: 0,
        [CALCULATOR.SIX]: 0,
      };
      const purchasePrice = 8000;

      const totalProfit = CalculatorService.calculateTotalProfit(
        calculator,
        lottoResult,
        purchasePrice
      );

      expect(totalProfit).toBe(62.5);
    });
  });
});
