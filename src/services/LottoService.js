import { Lotto } from "../models/index.js";
// 로또 번호 계산하기 (구입 개수만큼)
class LottoService {
    
    static getLottoList(purchaseCounts) {
        const lottoList = [];
        for (let i = 0; i < purchaseCounts; i++) {
            let lotto = Lotto.getLotto();
            lottoList.push(lotto);
        }

        return lottoList;
    }
}

export { LottoService };

