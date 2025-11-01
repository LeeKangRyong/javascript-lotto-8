import { InputService, LottoService, CalculatorService } from './services/index.js';
import { Calculator } from './models/index.js';
import { Output } from './views/index.js';
import { PURCHASE_UNIT } from './models/purchase/utils/PurchaseConstants.js';

class App {
  async run() {
    // 1. 구입 금액 구하기
    const purchase = await InputService.inputPurchase();
    const purchasePrice = purchase.getPurchasePrice();

    // 2. 구입 개수 계산하기
    const purchaseCounts = purchase.calculateCounts();

    // 3. 구입 개수 출력하기
    Output.printPurchaseCounts(purchaseCounts);

    // 4. 로또 번호 계산하기
    const lottoList = LottoService.getLottoList(purchaseCounts);

    // 5. 로또 리스트 출력하기
    Output.printLottoList(lottoList);

    // 6. 당첨 번호 구하기
    const winningNumbers = await InputService.getWinningNumbers();
    Output.printSpace();

    // 7. 보너스 번호 구하기
    const bonusNumber = await InputService.getBonusNumber();

    // 8. Calculator 생성하기
    const calculator = new Calculator({ winningNumbers, bonusNumber });

    // 9. 당첨 통계 계산하기
    const lottoResult = CalculatorService.calculateLottoResult(calculator, lottoList);

    // 10. 당첨 통계 출력하기
    Output.printCalculatorResult(lottoResult);

    // 11. 수익률 계산하기
    const totalProfit = CalculatorService.calculateTotalProfit(calculator, lottoResult, purchasePrice);

    // 12. 수익률 출력하기
    Output.printTotalProfitResult(totalProfit);
  }
}

export default App;