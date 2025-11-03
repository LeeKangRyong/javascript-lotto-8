import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error("No more inputs available");
    }

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("로또 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("전체 기능 테스트", () => {
    test("1. 모든 입력이 1회씩 정상적으로 작동하는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      mockRandoms([
        [8, 21, 23, 41, 42, 43],
        [3, 5, 11, 16, 32, 38],
        [7, 11, 16, 35, 36, 44],
        [1, 8, 11, 31, 41, 42],
        [13, 14, 16, 38, 42, 45],
        [7, 11, 30, 40, 42, 43],
        [2, 13, 22, 32, 38, 45],
        [1, 3, 5, 14, 22, 45],
      ]);
      mockQuestions(["8000", "1,2,3,4,5,6", "7"]);

      // when
      const app = new App();
      await app.run();

      // then
      const logs = [
        "8개를 구매했습니다.",
        "[8, 21, 23, 41, 42, 43]",
        "[3, 5, 11, 16, 32, 38]",
        "[7, 11, 16, 35, 36, 44]",
        "[1, 8, 11, 31, 41, 42]",
        "[13, 14, 16, 38, 42, 45]",
        "[7, 11, 30, 40, 42, 43]",
        "[2, 13, 22, 32, 38, 45]",
        "[1, 3, 5, 14, 22, 45]",
        "3개 일치 (5,000원) - 1개",
        "4개 일치 (50,000원) - 0개",
        "5개 일치 (1,500,000원) - 0개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
        "6개 일치 (2,000,000,000원) - 0개",
        "총 수익률은 62.5%입니다.",
      ];

      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });

    test("2. 다른 입력값으로 모든 기능이 정상적으로 작동하는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      mockRandoms([
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
      ]);
      mockQuestions(["5000", "10,20,30,40,41,42", "43"]);

      // when
      const app = new App();
      await app.run();

      // then
      const logs = [
        "5개를 구매했습니다.",
        "[1, 2, 3, 4, 5, 6]",
        "[7, 8, 9, 10, 11, 12]",
        "[13, 14, 15, 16, 17, 18]",
        "[19, 20, 21, 22, 23, 24]",
        "[25, 26, 27, 28, 29, 30]",
        "3개 일치 (5,000원) - 0개",
        "4개 일치 (50,000원) - 0개",
        "5개 일치 (1,500,000원) - 0개",
        "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
        "6개 일치 (2,000,000,000원) - 0개",
        "총 수익률은 0.0%입니다.",
      ];

      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });
  });

  describe("예외 테스트", () => {
    test("1. 잘못된 입력이 정상적으로 처리되는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
      const INPUT_NUMBERS_TO_END = ["1000", "1,2,3,4,5,6", "7"];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions(["1000j", ...INPUT_NUMBERS_TO_END]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
    });

    test("2. 구입 개수에서 오류가 정상적으로 처리되는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
      const INPUT_NUMBERS_TO_END = ["1000", "1,2,3,4,5,6", "7"];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions(["500", ...INPUT_NUMBERS_TO_END]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
    });

    test("3. 로또에서 오류가 정상적으로 처리되는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions(["1000", "1,2,3,4,5", "1,2,3,4,5,6", "7"]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
    });

    test("4. 계산기에서 오류가 정상적으로 처리되는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions(["1000", "1,2,3,4,5,6", "3", "7"]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
    });
  });

  describe("재입력 테스트", () => {
    test("1. 구입 개수에서 2번 재입력이 정상적으로 작동하는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions(["abc", "500", "1000", "1,2,3,4,5,6", "7"]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("1개를 구매했습니다.")
      );
    });

    test("2. 로또에서 3번 재입력이 정상적으로 작동하는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();
      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions([
        "1000",
        "1,2,3,4,5",
        "1,2,3,4,5,5",
        "1,2,3,4,5,50",
        "1,2,3,4,5,6",
        "7",
      ]);

      // when
      const app = new App();
      await app.run();

      // then
      const calls = logSpy.mock.calls.map((call) => call[0]);
      const errorCount = calls.filter((call) =>
        call.includes("[ERROR]")
      ).length;

      expect(errorCount).toBe(3);
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("1개를 구매했습니다.")
      );
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("[1, 2, 3, 4, 5, 6]")
      );
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("총 수익률은")
      );
    });

    test("3. 계산기에서 1번 재입력이 정상적으로 작동하는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions(["1000", "1,2,3,4,5,6", "3", "7"]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("총 수익률은")
      );
    });

    test("4. 구입 개수에서 1번, 로또에서 2번, 계산기에서 1번 재입력이 정상적으로 작동하는지 확인한다.", async () => {
      // given
      const logSpy = getLogSpy();

      const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];

      mockRandoms([RANDOM_NUMBERS_TO_END]);
      mockQuestions([
        "500",
        "1000",
        "1,2,3,4,5",
        "1,2,3,4,5,5",
        "1,2,3,4,5,6",
        "3",
        "7",
      ]);

      // when
      const app = new App();
      await app.run();

      // then
      const calls = logSpy.mock.calls.map((call) => call[0]);
      const errorCount = calls.filter((call) =>
        call.includes("[ERROR]")
      ).length;
      expect(errorCount).toBe(4);
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("총 수익률은")
      );
    });
  });
});
