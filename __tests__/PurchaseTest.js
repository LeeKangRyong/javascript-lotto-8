import { Purchase, PURCHASE_ERROR } from "../src/models/index.js";
import { checkErrorMessage, NUMBER_ERROR } from "../src/shared/index.js";

describe(" 구입 클래스 테스트", () => {
  describe("구입 정상 테스트", () => {
    test("1. 정상적인 구입 금액 넣었을 때 작동하는 지 확인한다.", () => {
      expect(() => {
        new Purchase(5000);
      }).not.toThrow();
    });
  });

  describe("구입 예외 테스트", () => {
    test("1. 구입 금액이 숫자가 아니면 예외가 발생한다.", () => {
      expect(() => {
        new Purchase("abc");
      }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_NUMBER));
    });

    test("2. 구입 금액이 정수가 아니면 예외가 발생한다.", () => {
      expect(() => {
        new Purchase(1510.2);
      }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_INTEGER_NUMBER));
    });

    test("3. 구입 금액이 양수가 아니면 예외가 발생한다.", () => {
      expect(() => {
        new Purchase(0);
      }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_POSITIVE_NUMBER));
    });

    test("4. 구입 금액이 음수면 예외가 발생한다.", () => {
      expect(() => {
        new Purchase(-2000);
      }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_POSITIVE_NUMBER));
    });

    test("5. 구입 금액이 PURCHASE_UNIT 이상이 아니면 예외가 발생한다.", () => {
      expect(() => {
        new Purchase(900);
      }).toThrow(checkErrorMessage(PURCHASE_ERROR.NOT_OVER_PURCHASE_UNIT));
    });

    test("6. 구입 금액이 PURCHASE_UNIT으로 나누어 떨어지지 않으면 예외가 발생한다.", () => {
      expect(() => {
        new Purchase(2490);
      }).toThrow(
        checkErrorMessage(PURCHASE_ERROR.NOT_DIVISABLE_BY_PURCHASE_UNIT)
      );
    });
  });
});
