// src/js/views/CartView.js

export class CartView {
    constructor() {
        // Pillamos los elementos del DOM que vamos a modificar
        this.productList = document.getElementById('product-list');
        this.cartContainer = document.getElementById('cart-items-container');
        this.cartCount = document.getElementById('cart-count');
        this.cartTotal = document.getElementById('cart-total');
        this.btnClearCart = document.getElementById('btn-clear-cart');
    }

    // Pinta los productos disponibles en la tienda
    renderProducts(products) {
        this.productList.innerHTML = ''; // Limpiamos por si acaso

        products.forEach(product => {
            // Creamos la tarjeta del producto
            const div = document.createElement('div');
            div.className = 'product-card';
            
            // Usamos innerHTML para la estructura básica
            div.innerHTML = `
                <h3>${product.name}</h3>
                <p>Precio: ${product.price}€</p>
                <button class="btn-add" data-id="${product.id}">Añadir al carrito</button>
            `;
            
            this.productList.appendChild(div);
        });
    }

    // Pinta los artículos que están dentro del carrito
    renderCart(cartItems, total) {
        this.cartContainer.innerHTML = '';

        if (cartItems.length === 0) {
            this.cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
            this.cartCount.textContent = '0';
            this.cartTotal.textContent = '0.00';
            this.btnClearCart.disabled = true;
            return;
        }

        // Si hay items, actualizamos contadores y pintamos
        let totalItems = 0;

        cartItems.forEach(item => {
            totalItems += item.quantity;

            const div = document.createElement('div');
            div.className = 'cart-item';
            
            div.innerHTML = `
                <span>${item.product.name} (x${item.quantity})</span>
                <span>${item.subtotal}€</span>
                <button class="btn-remove" data-id="${item.product.id}">❌</button>
            `;
            
            this.cartContainer.appendChild(div);
        });

        // Actualizamos los totales en el header y el footer
        this.cartCount.textContent = totalItems;
        this.cartTotal.textContent = total.toFixed(2);
        this.btnClearCart.disabled = false;
    }
}