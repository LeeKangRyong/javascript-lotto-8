const CALCULATOR = Object.freeze({
    'THREE' : 3,
    'FOUR' : 4,
    'FIVE' : 5,
    'FIVE_BONUS' : 'FIVE_BONUS',
    'SIX' : 6
});

const CALCULATOR_PRICE = Object.freeze({
    'THREE_PRICE' : 5000,
    'FOUR_PRICE' : 50000,
    'FIVE_PRICE' : 1500000,
    'FIVE_BONUS_PRICE' : 30000000,
    'SIX_PRICE' : 2000000000
});

const CALCULATOR_ERROR = Object.freeze({
    'DUPLICATED_BONUS_NUMBER' : 'Bonus number must not be same with winning numbers'
});

export { CALCULATOR, CALCULATOR_PRICE, CALCULATOR_ERROR };