import { MissionUtils } from "@woowacourse/mission-utils";
import { OUTPUT } from "./utils/OutputConstants.js";

class Output {
    constructor() {}
    
    static #printSpace() {
        MissionUtils.Console.print(OUTPUT.SPACE);
    }

    static printPurchaseCounts(purchaseCounts) {
        this.#printSpace();
        MissionUtils.Console.print(`${purchaseCounts}${OUTPUT.PURCHASE_COUNTS}`);
    }

    static printLottoList(lottoList, purchaseCounts) {
        for (let i = 0; i < purchaseCounts; i++) {
            MissionUtils.Console.print(lottoList[i]);
        }
    }

};

export { Output };