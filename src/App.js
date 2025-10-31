import { InputService } from './services/index.js';
import { Output } from './views/index.js';
class App {
  async run() {
    // 1. 구입 금액 구하기
    const purchase = await InputService.inputPurchase();

    // 2. 구입 개수 계산하기
    const purchaseCounts = purchase.calculateCounts();

    // 3. 구입 개수 출력하기
    Output.printPurchaseCounts(purchaseCounts);

    // 4. 로또 번호 계산하기

    // 5. 로또 리스트 출력하기

    // 6. 당첨 번호 구하기
    const winningNumbers = await InputService.getWinningNumbers();

    // 7. 보너스 번호 구하기
    const bonusNumber = await InputService.getBonusNumber();
    // 8. 당첨 통계 계산하기

    // 9. 당첨 통계 출력하기

    // 10. 수익률 계산하기

    // 11. 수익률 출력하기
  }
}

export default App;
