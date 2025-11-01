import { Purchase, PURCHASE_ERROR } from '../src/models/index.js';
import { checkErrorMessage } from '../src/shared/index.js';

describe(" 구입 클래스 테스트", () => {
    test("1. 구입 금액이 PURCHASE_UNIT 이상이 아니면 예외가 발생한다.", () => {
        expect(() => {
            new Purchase(900);
        }).toThrow(checkErrorMessage(PURCHASE_ERROR.NOT_OVER_PURCHASE_UNIT));   
    });

    test("2. 구입 금액이 PURCHASE_UNIT으로 나누어 떨어지지 않으면 예외가 발생한다.", () => {
        expect(() => {
            new Purchase(2490);
        }).toThrow(checkErrorMessage(PURCHASE_ERROR.NOT_DIVISABLE_BY_PURCHASE_UNIT));
    });
});