import { Output, OUTPUT, OUTPUT_CALCULATOR } from "../src/views/index.js";
import { WoowaError, ERROR_PREFIX } from "../src/shared/index.js";
import { CALCULATOR } from "../src/models/index.js";
import { MissionUtils } from "@woowacourse/mission-utils";

describe("출력 클래스 테스트", () => {
  let mockPrint;

  beforeEach(() => {
    mockPrint = jest.spyOn(MissionUtils.Console, "print");
    mockPrint.mockClear();
  });

  afterEach(() => {
    mockPrint.mockRestore();
  });

  describe("구입 개수 출력 테스트", () => {
    test("1. 구입 개수가 정상적으로 출력되는지 확인한다.", () => {
      Output.printPurchaseCounts(8);

      expect(mockPrint).toHaveBeenCalledWith(expect.stringContaining("8"));
      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("개를 구매했습니다.")
      );
    });
  });

  describe("로또 리스트 출력 테스트", () => {
    test("1. 로또 리스트가 정상적으로 출력되는지 확인한다.", () => {
      const lottoList = [
        [8, 21, 23, 41, 42, 43],
        [3, 5, 11, 16, 32, 38],
      ];

      Output.printLottoList(lottoList, 2);

      expect(mockPrint).toHaveBeenCalledWith("[8, 21, 23, 41, 42, 43]");
      expect(mockPrint).toHaveBeenCalledWith("[3, 5, 11, 16, 32, 38]");
    });

    test("2. 로또 번호가 오름차순으로 정렬되어 출력되는지 확인한다.", () => {
      const lottoList = [[43, 8, 42, 21, 41, 23]];

      Output.printLottoList(lottoList, 1);

      expect(mockPrint).toHaveBeenCalledWith("[8, 21, 23, 41, 42, 43]");
    });
  });

  describe("당첨 통계 출력 테스트", () => {
    test("1. 당첨 통계 헤더가 정상적으로 출력되는지 확인한다.", () => {
      Output.printCalculatorHeader();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("당첨 통계")
      );
      expect(mockPrint).toHaveBeenCalledWith(expect.stringContaining("---"));
    });

    test("2. 당첨 통계 결과가 정상적으로 출력되는지 확인한다.", () => {
      const lottoResult = {
        [CALCULATOR.THREE]: 1,
        [CALCULATOR.FOUR]: 0,
        [CALCULATOR.FIVE]: 0,
        [CALCULATOR.FIVE_BONUS]: 0,
        [CALCULATOR.SIX]: 0,
      };

      Output.printCalculatorResult(lottoResult);

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("3개 일치")
      );
      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("5,000원")
      );
      expect(mockPrint).toHaveBeenCalledWith(expect.stringContaining("1개"));
    });

    test("3. 보너스 볼 일치 통계가 정상적으로 출력되는지 확인한다.", () => {
      const lottoResult = {
        [CALCULATOR.THREE]: 0,
        [CALCULATOR.FOUR]: 0,
        [CALCULATOR.FIVE]: 0,
        [CALCULATOR.FIVE_BONUS]: 1,
        [CALCULATOR.SIX]: 0,
      };

      Output.printCalculatorResult(lottoResult);

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("5개 일치, 보너스 볼 일치")
      );
      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("30,000,000원")
      );
    });
  });

  describe("수익률 출력 테스트", () => {
    test("1. 수익률이 정상적으로 출력되는지 확인한다.", () => {
      Output.printTotalProfitResult(62.5);

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("총 수익률은")
      );
      expect(mockPrint).toHaveBeenCalledWith(expect.stringContaining("62.5%"));
      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("입니다.")
      );
    });

    test("2. 소수점 첫째 자리까지 출력되는지 확인한다.", () => {
      Output.printTotalProfitResult(125.6);

      expect(mockPrint).toHaveBeenCalledWith(expect.stringContaining("125.6%"));
    });
  });

  describe("에러 출력 테스트", () => {
    test("1. WoowaError를 출력 시 ERROR_PREFIX가 포함되는지 확인한다.", () => {
      const woowaError = new WoowaError("테스트 에러");

      Output.printError(woowaError);

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );
      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("테스트 에러")
      );
    });

    test("2. 일반 Error를 출력 시 ERROR_PREFIX가 추가되는지 확인한다.", () => {
      const normalError = new Error("일반 에러");

      Output.printError(normalError);

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );
      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining("일반 에러")
      );
    });
  });

  describe("공백 출력 테스트", () => {
    test("1. 공백이 정상적으로 출력되는지 확인한다.", () => {
      Output.printSpace();

      expect(mockPrint).toHaveBeenCalledWith("");
    });
  });
});
