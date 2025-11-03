import { PURCHASE_UNIT, PURCHASE_ERROR } from "./PurchaseConstants.js";
import { WoowaError } from "../../../shared/index.js";
class PurchaseValidator {
  static #isOverPurchaseUnit(purchasePrice) {
    return purchasePrice >= PURCHASE_UNIT;
  }

  static #isDivisibleByPurchaseUnit(purchasePrice) {
    return purchasePrice % PURCHASE_UNIT === 0;
  }

  static isFitOnPurchaseUnit(purchasePrice) {
    if (!this.#isOverPurchaseUnit(purchasePrice))
      throw new WoowaError(PURCHASE_ERROR.NOT_OVER_PURCHASE_UNIT);
    if (!this.#isDivisibleByPurchaseUnit(purchasePrice))
      throw new WoowaError(PURCHASE_ERROR.NOT_DIVISABLE_BY_PURCHASE_UNIT);
  }
}

export { PurchaseValidator };
