import { NumberValidator } from "../../shared/index.js";

class Purchase {
    #purchasePrice;

    constructor(purchasePrice) {
        this.#validate(purchasePrice);
        this.#purchasePrice = purchasePrice;
    }

    #validate(purchasePrice) {
        NumberValidator.isValidPositiveIntegerNumber(purchasePrice);
    }

}

export { Purchase };