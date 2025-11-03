import { NumberValidator } from "../../shared/index.js";
import { PurchaseValidator } from "./utils/PurchaseValidators.js";
import { PURCHASE_UNIT } from "./utils/PurchaseConstants.js";

class Purchase {
  #purchasePrice;

  constructor(purchasePrice) {
    this.#validate(purchasePrice);
    this.#purchasePrice = purchasePrice;
  }

  getPurchasePrice() {
    return this.#purchasePrice;
  }

  #validate(purchasePrice) {
    NumberValidator.isValidPositiveIntegerNumber(purchasePrice);
    PurchaseValidator.isFitOnPurchaseUnit(purchasePrice);
  }

  calculateCounts() {
    return this.#purchasePrice / PURCHASE_UNIT;
  }
}

export { Purchase };
