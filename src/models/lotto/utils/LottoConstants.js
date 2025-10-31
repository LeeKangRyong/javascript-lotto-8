const LOTTO = Object.freeze({
    'START' : 1,
    'END' : 45,
    'COUNTS' : 6,
    'NUMBER_SPLITTER' : ','
});

const LOTTO_ERROR = Object.freeze({
    'DUPLICATED_NUMBER_EXISTS' : 'Duplicated number exists',
    'SIX_NUMBERS' : 'Lotto must have 6 numbers',
    'INVALID_RANGE' : 'Not in range betwwen 1 and 45'
});

export { LOTTO, LOTTO_ERROR };