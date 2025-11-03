const OUTPUT = Object.freeze({
  SPACE: "",
  PURCHASE_COUNTS: "개를 구매했습니다.\n",
  CALCULATOR_HEADER: "당첨 통계\n---",
  LOTTO_SPLITTER: ", ",
  SPLITTER: ",",
  DECIMAL_POINT: ".",
});

const OUTPUT_CALCULATOR = Object.freeze({
  PRICE_UNIT: "원",
  MATCHING: "개 일치",
  BONUS: "보너스 볼 일치",
  MATCHING_COUNTS: "개",
  PROFIT_HEADER: "총 수익률은",
  PROFIT_FOOTER: "%입니다.",
});

const OUTPUT_FORMAT_ERROR = Object.freeze({
  INVALID_LOTTO_FORMAT: "Lotto must be sorted ascending",
  INVALID_PRICE_FORMAT: "Incorrect position of splitter",
  INVALID_PROFIT_FORMAT: "Incorrect rounding of profit",
});

export { OUTPUT, OUTPUT_CALCULATOR, OUTPUT_FORMAT_ERROR };
