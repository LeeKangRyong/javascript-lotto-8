import { Lotto, LOTTO_ERROR } from '../src/models/index.js';
import { LottoService } from '../src/services/index.js';
import { checkErrorMessage, NUMBER_ERROR } from '../src/shared/index.js';
import { MissionUtils } from '@woowacourse/mission-utils';

describe("로또 클래스 테스트", () => {
    describe("로또 정상 테스트", () => {
        test("1. 로또 생성 시 정상 작동하는 지 확인한다.", () => {
            expect(() => {
                new Lotto([1, 2, 3, 4, 5, 6]);
            }).not.toThrow();
        });
    });
    
    describe("로또 예외 테스트", () => {
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

    describe("로또 서비스 클래스 테스트", () => {
        beforeEach(() => {
            jest.restoreAllMocks();
        });

        test("1. 요청한 개수만큼 로또를 생성하는지 확인한다.", () => {
            const mockPickUniqueNumbers = jest.spyOn(MissionUtils.Random, 'pickUniqueNumbersInRange');
            mockPickUniqueNumbers
                .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
                .mockReturnValueOnce([7, 8, 9, 10, 11, 12])
                .mockReturnValueOnce([13, 14, 15, 16, 17, 18]);

            const purchaseCounts = 3;
            const lottoList = LottoService.getLottoList(purchaseCounts);

            expect(lottoList).toHaveLength(3);
            expect(mockPickUniqueNumbers).toHaveBeenCalledTimes(3);
        });

        test("2. 생성된 로또가 올바른 형식인지 확인한다.", () => {
            const mockPickUniqueNumbers = jest.spyOn(MissionUtils.Random, 'pickUniqueNumbersInRange');
            mockPickUniqueNumbers.mockReturnValueOnce([8, 21, 23, 41, 42, 43]);

            const purchaseCounts = 1;
            const lottoList = LottoService.getLottoList(purchaseCounts);

            expect(lottoList[0]).toHaveLength(6);
            expect(lottoList[0]).toEqual([8, 21, 23, 41, 42, 43]);
        });
    });
});