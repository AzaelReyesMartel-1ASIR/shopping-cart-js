// js/models/CartItem.js
export class CartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    // getter para calcular el subtotal
    get subtotal() {
        return this.product.price * this.quantity;
    }
}