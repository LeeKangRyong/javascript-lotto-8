import { WoowaError, ERROR_PREFIX } from "../src/shared/index.js";
import { MissionUtils } from "@woowacourse/mission-utils";

describe('일반 에러 테스트', () => { 
    test('1. TypeError에 [ERROR] 붙는 지 확인', () => {
        expect(() => {
            try {
                null.property;
            } catch (error) {
                throw new WoowaError(error.message);
            }
        }).toThrow(ERROR_PREFIX);
    });

    test('2. ReferenceError에 [ERROR] 붙는 지 확인', () => {
        expect(() => {
            try {
                MissionUtils.Console.print(undefinedVariable);
            } catch (error) {
                throw new WoowaError(error.message);
            }
        }).toThrow(ERROR_PREFIX);
    });

    test('3. 일반 Error에 [ERROR] 붙는 지 확인', () => {
        expect(() => {
            try {
                throw new Error("일반 에러 발생");
            } catch (error) {
                throw new WoowaError(error.message);
            }
        }).toThrow(ERROR_PREFIX);
    });

    test('4. 변환된 에러가 WoowaError 인스턴스인지 확인', () => {
        try {
            try {
                null.property;
            } catch (error) {
                throw new WoowaError(error.message);
            }
        } catch (error) {
            expect(error).toBeInstanceOf(WoowaError);
            expect(error.message).toContain(ERROR_PREFIX);
        }
    });
});