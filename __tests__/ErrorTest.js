import { WoowaError, ERROR_PREFIX } from "../src/shared/index.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { Output } from "../src/views/index.js";

describe('일반 에러 테스트', () => {
    let mockPrint;
    beforeEach(() => { mockPrint = jest.spyOn(MissionUtils.Console, 'print'); });
    afterEach(() => { mockPrint.mockRestore(); });

    test('1. TypeError에 [ERROR] 붙는 지 확인', () => {
        expect(() => {
            try {
                null.property;
            } catch (error) {
                throw new WoowaError(error.message);
            }
        }).toThrow(ERROR_PREFIX);
    });

    test('2. 일반 Error에 [ERROR] 붙는 지 확인', () => {
        expect(() => {
            try {
                throw new Error("일반 에러 발생");
            } catch (error) {
                throw new WoowaError(error.message);
            }
        }).toThrow(ERROR_PREFIX);
    });

    test('3. 변환된 에러가 WoowaError 인스턴스인지 확인', () => {
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

    test('4. 일반 Error를 printError로 출력 시 [ERROR] 확인', () => {
        const normalError = new Error("일반 에러");
        Output.printError(normalError);
        
        expect(mockPrint).toHaveBeenCalledWith(
            expect.stringContaining(ERROR_PREFIX)
        );
        expect(mockPrint).toHaveBeenCalledWith(
            expect.stringContaining("일반 에러")
        );
    });

    test('5. TypeError를 printError로 출력 시 [ERROR] 확인', () => {
        try {
            null.property;
        } catch (error) {
            Output.printError(error);
        }
        
        expect(mockPrint).toHaveBeenCalled();
        const printedMessage = mockPrint.mock.calls[0][0];
        expect(printedMessage).toContain(ERROR_PREFIX);
    });

    test('6. WoowaError를 printError로 출력 시 올바르게 처리되는지 확인', () => {
        const woowaError = new WoowaError("커스텀 에러");
        Output.printError(woowaError);
        
        expect(mockPrint).toHaveBeenCalled();
        const printedMessage = mockPrint.mock.calls[0][0];
        
        expect(printedMessage).toContain(ERROR_PREFIX);
        expect(printedMessage).toContain("커스텀 에러");
    });
});