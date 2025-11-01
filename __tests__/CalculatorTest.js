import { CalculatorValidator, CALCULATOR_ERROR } from '../src/models/index.js';
import { checkErrorMessage } from '../src/shared/index.js';

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
});