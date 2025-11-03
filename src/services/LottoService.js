import { MissionUtils } from "@woowacourse/mission-utils";
import { Lotto, LOTTO } from "../models/index.js";

class LottoService {
  static getLottoList(purchaseCounts) {
    const lottoList = [];
    for (let i = 0; i < purchaseCounts; i++) {
      const numbers = MissionUtils.Random.pickUniqueNumbersInRange(
        LOTTO.MIN,
        LOTTO.MAX,
        LOTTO.COUNTS
      );

      const lotto = new Lotto(numbers);
      lottoList.push(lotto.getNumbers());
    }

    return lottoList;
  }
}

export { LottoService };
