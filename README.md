# 프리코스 3주차: 로또
## 구현 기능 정리
<img src="/images/flowchart_3w.png">

<br>

- [ ] 1. 구입 금액 구하기
    - [ ] 구입 금액 입력하기
    - [ ] 구입 금액 검증하기
        - [ ] 숫자인지?
        - [ ] 정수인지?
        - [ ] 양수인지?
        - [ ] 1,000원 이상인지?
        - [ ] 1,000원 단위로 떨어져있는지?

<br>

- [ ] 2. 구입 개수 계산하기
    - [ ] 검증하기
        - [ ] 숫자인지?
        - [ ] 정수인지?
        - [ ] 양수인지?

<br>

- [ ] 3. 구입 개수 출력하기

<br>

- [ ] 4. 로또 번호 계산하기
    - [ ] 번호 6개를 중복되지 않게 랜덤으로 뽑기
    - [ ] 6개로 하나의 로또 만들기
    - [ ] 로또 검증하기
        - [ ] 중복되지 않는지?
    - [ ] 로또의 번호 검증하기
        - [ ] 숫자인지?
        - [ ] 정수인지?
        - [ ] 양수인지?
        - [ ] 1 ~ 45인지?
    - [ ] 로또 리스트에 로또 넣기
    - [ ] 위 과정을 구입 개수만큼 반복

<br>

- [ ] 5. 로또 리스트 출력하기
    - [ ] 로또 리스트 검증하기
        - [ ] 1차원 배열로 여러 개 출력되는 지?
        - `, `로 각 번호가 나눠지는지?

<br>

- [ ] 6. 당첨 번호 구하기
    - [ ] 당첨 번호 입력하기
    - [ ] `,`로 split하기
    - [ ] 당첨 번호 검증하기
        - [ ] 숫자인지?
        - [ ] 정수인지?
        - [ ] 양수인지?
        - [ ] 1 ~ 45인지?
    - [ ] 당첨 번호 리스트 검증하기
        - [ ] 번호가 6개인지?

<br>

- [ ] 7. 보너스 번호 구하기
    - [ ] 보너스 번호 입력하기
    - [ ] 보너스 번호 검증하기
        - [ ] 숫자인지?
        - [ ] 정수인지?
        - [ ] 양수인지?

<br> 

- [ ] 8. 당첨 통계 계산하기
    - [ ] 일치하는 개수 구하기
    - [ ] 각 개수 검증하기
        - [ ] 숫자인지?
        - [ ] 정수인지?
        - [ ] 음수가 아닌지?

<br>

- [ ] 9. 당첨 통계 출력하기
    - [ ] 일치하는 개수에 맞게 출력하기

<br>

- [ ] 10. 수익률 계산하기
    - [ ] 일치하는 개수에 맞게 수익 계산하기
    - [ ] 수익 / 로또 가격으로 수익률 계산하기
    - [ ] 수익률 검증하기
        - [ ] 숫자인지?
        - [ ] 음수가 아닌지?

<br>

- [ ] 11. 수익률 출력하기
    - [ ] 소수점 둘째 자리에서 반올림해서 출력하기

<br />


## 프로그래밍 요구 사항



<br />

## 아키텍처 - MVC
```
|- controllers/
|   |- LottoMachine.js
|
|- services/
|   |- lotto/
|   |   |- LottoService.js
|   |- calculator/
|   |   |- CalculatorService.js
|   |- index.js
|
|- models/
|   |- lotto/
|   |   |- Lotto.js
|   |   |- LottoList.js
|   |   |- utils/
|   |- calculator/
|   |   |- Calculator.js
|   |   |- utils/
|   |- index.js
|
|- views/
|   |- input/ 
|   |   |- Input.js
|   |   |- utils/
|   |- output/
|   |   |- Output.js 
|   |   |- utils/
|   |- index.js
|
|- shared/
|   |- error/
|   |   |- WoowaError.js
|   |   |- utils/ 
|   |- common/
|   |   |- Common.js
|   |   |- utils/
|   |- index.js  
|  
____________________________
```
- `LottoMachine (controller)` : 로또 발매기 class

- `Lotto (model)` : 로또 단일 class

- `LottoList (model)` : 로또 번호를 묶어놓은 class

- `Calculator (model)` : 로또 통계 class

- `Input (view)` : 입력 class

- `Output (view)` : 출력 class

- `WoowaError (shared)` : 에러 throw 관련 class


<br />

## 에러 항목

- **공통 (Common)**
    - `[ERROR] Non-number` : 숫자가 아닐 때
    - `[ERROR] Non-integer number` : 정수가 아닐 떄
    - `[ERROR] Negative number` : 음수일 때
    - `[ERROR] Non-positive number` : 양수가 아닐 때

<br>

- **구입 (Purchase)**
    - `[ERROR] Less than 1,000 won` : 1,000원 이상이 아닐 때
    - 숫자가 아닐 때, 정수가 아닐 때, 양수가 아닐 때

<br>

- **로또 (Lotto)**
    - `[ERROR] Duplicated number exists` : 중복되는 로또 번호가 있을 때
    - `[ERROR] Not in range betwwen 1 and 45` : 1 ~ 45에 없는 숫자일 때
    - `[ERROR] Must be splitted by ', '` : `, `각 번호가 로 나눠지지 않았을 때
    - `[ERROR] Lotto must have 6 numbers` : 번호가 6개가 아닐 때
    - 숫자가 아닐 때, 정수가 아닐 때, 양수가 아닐 때

<br>

- **전체 로또 리스트 (LottoList)**

<br>

- **계산기 (Calculator)**
    - 수익률이 숫자가 아닐 때, 음수일 때

<br>

- **입력 (Input)**

<br>

- **출력 (Output)**

<br />

## 테스트

<br>

### 단위 테스트

<br />

## 참고자료
- [라이브러리 분석 결과](https://quirky-streetcar-a17.notion.site/mission-utils-28c523184d3c80d8904fe0870e5e4181?pvs=74)

- [우테코 Clean Code](https://github.com/woowacourse/woowacourse-docs/blob/main/cleancode/pr_checklist.md
)

- [2주차 피드백 내용 (작성 중)](https://velog.io/@gaiogo2/FE-8%EA%B8%B0-%ED%94%84%EB%A6%AC%EC%BD%94%EC%8A%A4-1%EC%A3%BC%EC%B0%A8-%ED%9A%8C%EA%B3%A0%EB%A1%9D)

- [단위 테스트 정리](https://quirky-streetcar-a17.notion.site/Testing-Jest-297523184d3c807a9402f1f518f31abd)