// js/services/CartService.js
import { CartItem } from '../models/CartItem.js';
import { CartError } from '../exceptions.js';

export class CartService {
    constructor(repository) {
        // pasamos el repo por el constructor para separar responsabilidades
        this.repository = repository;
        // instanciar el servicio, cargamos lo que haya guardado
        this.items = this.repository.loadCartItems(); 
    }

    // método para anadir un producto al carrito
    addProduct(product) {
        if (!product) {
            throw new CartError("Intento de añadir producto nulo", "ADD");
        }

        // comprobamos si el producto ya esta en el carrito
        const existingItem = this.items.find(item => item.product.id === product.id);

        if (existingItem) {
            // si ya lo teniamos, solo subimos la cantidad
            existingItem.quantity += 1;
        } else {
            // si es nuevo, creamos el objeto y lo metemos al array
            this.items.push(new CartItem(product, 1));
        }

        // guardamos el estado actual en localStorage
        this.repository.saveCartItems(this.items);
    }

    removeProduct(productId) {
        // filtramos el array para quitar el producto que coincide con el ID
        this.items = this.items.filter(item => item.product.id !== productId);
        this.repository.saveCartItems(this.items);
    }

    getTotalPrice() {
        // sumamos los subtotales de todos los items
        return this.items.reduce((total, item) => total + item.subtotal, 0);
    }
    
    // obtenemos los items del carrito
    getItems() {
        return this.items;
    }
}