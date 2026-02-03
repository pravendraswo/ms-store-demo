document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartDiv = document.getElementById('cart-items');
    const summaryDiv = document.getElementById('cart-summary');
    
    cartDiv.innerHTML = '';
    let total = 0;
    
    if (cartItems.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty. <a href="products.html">Continue Shopping</a></p>';
        summaryDiv.innerHTML = '';
        return;
    }
    
    cartItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'card p-3 mb-2';
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price.toFixed(2)} each</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeItem(${index})">Remove</button>
                </div>
                <div>
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
        `;
        cartDiv.appendChild(div);
        total += item.price * item.quantity;
    });
    
    summaryDiv.innerHTML = `
        <div class="card p-3">
            <h5>Cart Summary</h5>
            <p><strong>Total: $${total.toFixed(2)}</strong></p>
            <button class="btn btn-outline-secondary me-2" onclick="clearCart()">Clear Cart</button>
            <a href="checkout.html" class="btn btn-success">Proceed to Checkout</a>
        </div>
    `;
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}
