// src/js/main.js
import { Product } from './models/Product.js';
import { CartRepository } from './repositories/CartRepository.js';
import { CartService } from './services/CartService.js';
import { CartView } from './views/CartView.js';
import { CartController } from './controllers/CartController.js';

// Creamos unos productos a fuego para probar
const mockProducts = [
    new Product("1", "Teclado Mecánico", 85.50),
    new Product("2", "Ratón Inalámbrico", 45.00),
    new Product("3", "Monitor 24 pulgadas", 150.00),
    new Product("4", "Alfombrilla XXL", 15.99)
];

// Instanciamos las capas de la arquitectura
const repository = new CartRepository();
const service = new CartService(repository);
const view = new CartView();

// Le pasamos al controlador todo lo que necesita para trabajar
const controller = new CartController(service, view, mockProducts);

// Arrancamos
document.addEventListener('DOMContentLoaded', () => {
    controller.init();
});