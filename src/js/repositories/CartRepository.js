// js/repositories/CartRepository.js
import { CartError } from '../exceptions.js';

export class CartRepository {
    constructor() {
        // key para identificar nuestro carrito en el localStorage
        this.storageKey = 'carrito_examen_tema3';
    }

    // Método para guardar el carrito en el localStorage
    saveCartItems(cartItems) {
        try {
            // Convertimos el array a string para poder guardarlo
            localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
        } catch (error) {
            // Lanzamos nuestro error personalizado si algo falla
            throw new CartError("No se pudo guardar en el storage", "SAVE");
        }
    }

    // Método para cargar el carrito desde el localStorage
    loadCartItems() {
        try {
            const data = localStorage.getItem(this.storageKey);
            // Si hay datos los parseamos, si es null devolvemos un array vacío
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("El storage falló al cargar:", error);
            return [];
        }
    }
}