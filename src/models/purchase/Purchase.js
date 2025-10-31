import { NumberValidator } from '../../shared/index.js';
import { PurchaseValidator } from './utils/PurchaseValidators.js';

class Purchase {
    #purchasePrice;

    constructor(purchasePrice) {
        this.#validate(purchasePrice);
        this.#purchasePrice = purchasePrice;
    }

    #validate(purchasePrice) {
        NumberValidator.isValidPositiveIntegerNumber(purchasePrice);
        PurchaseValidator.isFitOnPurchaseUnit(purchasePrice);
    }

}

export { Purchase };