import { MissionUtils } from "@woowacourse/mission-utils";
import { InputService } from "../src/services/index.js";
import { ERROR_PREFIX } from "../src/shared/index.js";

describe("InputService 에러 처리 및 재입력 테스트", () => {
  let mockReadLineAsync;
  let mockPrint;

  beforeEach(() => {
    mockReadLineAsync = jest.spyOn(MissionUtils.Console, "readLineAsync");
    mockPrint = jest.spyOn(MissionUtils.Console, "print");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("구입 금액 재입력 테스트", () => {
    test("1. 잘못된 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("abc")
        .mockResolvedValueOnce("8000");

      const purchase = await InputService.inputPurchase();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);

      expect(purchase.getPurchasePrice()).toBe(8000);
    });

    test("2. 1000원 미만 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("500")
        .mockResolvedValueOnce("5000");

      const purchase = await InputService.inputPurchase();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(purchase.getPurchasePrice()).toBe(5000);
    });

    test("3. 1000원 단위가 아닌 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("1500")
        .mockResolvedValueOnce("2000");

      const purchase = await InputService.inputPurchase();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(purchase.getPurchasePrice()).toBe(2000);
    });

    test("4. 3번 잘못된 입력 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("abc")
        .mockResolvedValueOnce("500")
        .mockResolvedValueOnce("1500")
        .mockResolvedValueOnce("3000");

      const purchase = await InputService.inputPurchase();

      expect(mockPrint).toHaveBeenCalledTimes(3);
      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(4);

      expect(purchase.getPurchasePrice()).toBe(3000);
    });
  });

  describe("로또 재입력 테스트", () => {
    test("1. 잘못된 개수 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("1,2,3,4,5")
        .mockResolvedValueOnce("1,2,3,4,5,6");

      const winningNumbers = await InputService.getWinningNumbers();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("2. 중복된 번호 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("1,2,3,4,5,5")
        .mockResolvedValueOnce("1,2,3,4,5,6");

      const winningNumbers = await InputService.getWinningNumbers();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("3. 범위 밖 번호 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("1,2,3,4,5,50")
        .mockResolvedValueOnce("1,2,3,4,5,6");

      const winningNumbers = await InputService.getWinningNumbers();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("4. 문자열 포함 입력 2번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("1,2,3,4,5,abc")
        .mockResolvedValueOnce("1,2,ttt,4,5,7")
        .mockResolvedValueOnce("1,2,3,4,5,6");

      const winningNumbers = await InputService.getWinningNumbers();

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(3);
      expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("계산기 재입력 테스트", () => {
    const validWinningNumbers = [1, 2, 3, 4, 5, 6];

    test("1. 당첨 번호와 중복된 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync.mockResolvedValueOnce("3").mockResolvedValueOnce("7");

      const bonusNumber = await InputService.getBonusNumber(
        validWinningNumbers
      );

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(bonusNumber).toBe(7);
    });

    test("2. 범위 밖 번호 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync.mockResolvedValueOnce("50").mockResolvedValueOnce("7");

      const bonusNumber = await InputService.getBonusNumber(
        validWinningNumbers
      );

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(bonusNumber).toBe(7);
    });

    test("3. 문자열 입력 1번 후 올바른 입력 시 정상 작동하는 것을 확인한다.", async () => {
      mockReadLineAsync.mockResolvedValueOnce("abc").mockResolvedValueOnce("7");

      const bonusNumber = await InputService.getBonusNumber(
        validWinningNumbers
      );

      expect(mockPrint).toHaveBeenCalledWith(
        expect.stringContaining(ERROR_PREFIX)
      );

      expect(mockReadLineAsync).toHaveBeenCalledTimes(2);
      expect(bonusNumber).toBe(7);
    });

    test("4. 잘못된 입력 3번 후후 올바른 입력 시 정상 작동하는 것을 확인한다", async () => {
      mockReadLineAsync
        .mockResolvedValueOnce("3")
        .mockResolvedValueOnce("50")
        .mockResolvedValueOnce("abc")
        .mockResolvedValueOnce("7");

      const bonusNumber = await InputService.getBonusNumber(
        validWinningNumbers
      );

      expect(mockPrint).toHaveBeenCalledTimes(3);

      expect(mockReadLineAsync).toHaveBeenCalledTimes(4);

      expect(bonusNumber).toBe(7);
    });
  });
});
