// src/js/controllers/CartController.js

export class CartController {
    constructor(service, view, productsList) {
        this.service = service;
        this.view = view;
        this.productsList = productsList; // Los productos de prueba que le pasaremos
    }

    // Arranca la app
    init() {
        this.view.renderProducts(this.productsList);
        this.updateView();
        this.setupEvents();
    }

    // Ponemos a escuchar los clics
    setupEvents() {
        // Delegación de eventos para añadir productos
        this.view.productList.addEventListener('click', (event) => {
            // Comprobamos si lo que se ha clicado tiene la clase btn-add
            if (event.target.classList.contains('btn-add')) {
                // Sacamos el ID del dataset (data-id)
                const productId = event.target.dataset.id;
                const product = this.productsList.find(p => p.id === productId);
                
                if (product) {
                    this.service.addProduct(product);
                    this.updateView();
                }
            }
        });

        // Delegación de eventos para el carrito (borrar artículos)
        this.view.cartContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-remove')) {
                const productId = event.target.dataset.id;
                this.service.removeProduct(productId);
                this.updateView();
            }
        });

        // Evento para vaciar todo el carrito
        this.view.btnClearCart.addEventListener('click', () => {
            this.service.clearCart();
            this.updateView();
        });
    }

    // Centralizamos la actualización de la vista
    updateView() {
        const items = this.service.getItems();
        const total = this.service.getTotalPrice();
        this.view.renderCart(items, total);
    }
}