const PURCHASE_UNIT = 1000;

const PURCHASE_ERROR = Object.freeze({
  NOT_OVER_PURCHASE_UNIT: "Must not be less than purchase unit",
  NOT_DIVISABLE_BY_PURCHASE_UNIT: "Must be divisable by purchase unit",
});

export { PURCHASE_UNIT, PURCHASE_ERROR };
