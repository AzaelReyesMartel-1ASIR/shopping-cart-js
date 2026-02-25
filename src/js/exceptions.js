// js/exceptions.js
export class CartError extends Error {
    constructor(message, action = 'GENERAL') {
        super(message);
        this.name = 'CartError';
        this.action = action;
    }
}