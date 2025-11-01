import { Lotto, LOTTO_ERROR } from '../src/models/index.js';
import { checkErrorMessage, NUMBER_ERROR } from '../src/shared/index.js';

describe("로또 클래스 테스트", () => {
    test("1. 로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5, 6, 7]);
        }).toThrow(checkErrorMessage(LOTTO_ERROR.SIX_NUMBERS));
    });

    test("2. 로또 번호의 개수가 6개 미만이면 예외가 발생한다.", () => {
        expect(() => {
            new Lotto([1, 2, 3, 4]);
        }).toThrow(checkErrorMessage(LOTTO_ERROR.SIX_NUMBERS));
    });

    test("3. 로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5, 5]);
        }).toThrow(checkErrorMessage(LOTTO_ERROR.DUPLICATED_NUMBER_EXISTS));
    });

    test("4. 로또 번호에 1 ~ 45가 아닌 숫자가 있으면 예외가 발생한다.", () => {
        expect(() => {
            new Lotto([1, 20, 35, 40, 50, 17]);
        }).toThrow(checkErrorMessage(LOTTO_ERROR.INVALID_RANGE));
    });

    test("5. 로또 번호에 숫자가 아닌 값이 있으면 예외가 발생한다.", () => {
        expect(() => {
            new Lotto([1, 2, 3, 4, 5, 'abc']);
        }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_NUMBER));
    });
});