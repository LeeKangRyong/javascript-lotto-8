import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO } from "./utils/LottoConstants.js";
class Lotto {
  #numbers;

  constructor(numbers) {
    // this.#validate(numbers);
    this.#numbers = numbers;
  }

  // #validate(numbers) {
  //   if (numbers.length !== 6) {
  //     throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
  //   }
  // }

  // TODO: 추가 기능 구현
  static getLotto() {
    return MissionUtils.Random.pickUniqueNumbersInRange(LOTTO.START, LOTTO.END, LOTTO.COUNTS);
  }
}

export { Lotto };
