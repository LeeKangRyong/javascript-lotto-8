import { MissionUtils } from "@woowacourse/mission-utils";
import { OUTPUT, OutputFormatter } from "../index.js";
import { WoowaError, ERROR_PREFIX } from "../../shared/index.js";

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

    static printError(errorMessage) {
        if (errorMessage instanceof WoowaError) {
            MissionUtils.Console.print(errorMessage.message);
            return;
        }
        MissionUtils.Console.print(`[ERROR] ${errorMessage.message}`);
    }

};

export { Output };