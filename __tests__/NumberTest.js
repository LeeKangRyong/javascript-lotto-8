import { NumberValidator, NUMBER_ERROR, checkErrorMessage } from '../src/shared/index.js';

describe('숫자 기본 검증 테스트', () => {
    describe("숫자 기본 정상 테스트", () => {
        test("1. 정상적인 숫자로 잘 작동하는 지 확인한다.", () => {
            expect(() => {
                NumberValidator.isValidPositiveIntegerNumber(5);
            }).not.toThrow();
        });
    });
    
    describe("숫자 기본 예외 테스트", () => {
        test('1. 숫자가 아니면 예외가 발생한다.', () => {
            expect(() => {
                NumberValidator.isValidPositiveIntegerNumber('abc');
            }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_NUMBER));
        });

        test('2. 정수가 아니면 예외가 발생한다.', () => {
            expect(() => {
                NumberValidator.isValidPositiveIntegerNumber(3.14);
            }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_INTEGER_NUMBER));
        });

        test('3. 양수가 아니면 예외가 발생한다.', () => {
            expect(() => {
                NumberValidator.isValidPositiveIntegerNumber(0);
            }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_POSITIVE_NUMBER));
        });

        test('4. 음수면 예외가 발생한다.', () => {
            expect(() => {
                NumberValidator.isValidPositiveIntegerNumber(-5);
            }).toThrow(checkErrorMessage(NUMBER_ERROR.NON_POSITIVE_NUMBER));
        });
    });
});