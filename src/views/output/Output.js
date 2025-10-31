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

};

export { Output };