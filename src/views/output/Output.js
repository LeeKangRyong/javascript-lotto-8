import { MissionUtils } from "@woowacourse/mission-utils";
import { OUTPUT, OutputFormatter } from "../index.js";

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
        for (let lotto of lottoList) {
            MissionUtils.Console.print(OutputFormatter.sortLottobyAsc(lotto));
        }
        this.#printSpace();
    }

};

export { Output };