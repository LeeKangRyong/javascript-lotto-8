import {
  OutputFormatter,
  OutputValidator,
  OUTPUT_FORMAT_ERROR,
} from "../src/views/index.js";
import { checkErrorMessage } from "../src/shared/index.js";

describe("OutputFormatter 테스트", () => {
  describe("로또 format 테스트", () => {
    test("1. 정상적으로 오름차순 정렬되는 지 확인한다.", () => {
      const mockLotto = [3, 5, 6, 7, 2, 9];
      const result = OutputFormatter.sortLottobyAsc(mockLotto);

      expect(result).toEqual([2, 3, 5, 6, 7, 9]);
    });

    test("2. 정렬되지 않은 배열을 직접 검증하면 예외가 발생한다.", () => {
      const unsortedLotto = [5, 3, 8, 1, 2, 9];

      expect(() => {
        OutputValidator.isValidLottoFormat(unsortedLotto);
      }).toThrow(checkErrorMessage(OUTPUT_FORMAT_ERROR.INVALID_LOTTO_FORMAT));
    });
  });

  describe("가격 format 테스트", () => {
    test("1. 정상적으로 포맷되는 지 확인한다. ", () => {
      const mockPrice = 5000;
      const result = OutputFormatter.formatPrice(mockPrice);

      expect(result).toBe("5,000");
    });

    test("6. 잘못된 가격 포맷을 직접 검증하면 예외가 발생한다.", () => {
      const wrongFormat = "1,23,456";

      expect(() => {
        OutputValidator.isValidPriceFormat(wrongFormat);
      }).toThrow(checkErrorMessage(OUTPUT_FORMAT_ERROR.INVALID_PRICE_FORMAT));
    });
  });

  describe("수익률 format 테스트", () => {
    test("1. 소수점 둘째 자리에서 정상적으로 내림되는 지 확인한다.", () => {
      const mockProfit = 62.242;
      const result = OutputFormatter.formatProfit(mockProfit);

      expect(result).toBe("62.2");
    });

    test("2. 소수점 둘째자리에서 올림되는지 확인한다.", () => {
      const mockProfit = 62.5865;
      const result = OutputFormatter.formatProfit(mockProfit);

      expect(result).toBe("62.6");
    });

    test("3. 잘못된 포맷을 직접 검증하면 예외가 발생한다.", () => {
      const wrongFormat = "62.555";

      expect(() => {
        OutputValidator.isValidProfitFormat(wrongFormat);
      }).toThrow(checkErrorMessage(OUTPUT_FORMAT_ERROR.INVALID_PROFIT_FORMAT));
    });
  });
});
