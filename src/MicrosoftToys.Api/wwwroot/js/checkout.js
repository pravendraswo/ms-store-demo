document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        placeOrder();
    });
});

function loadOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const summaryDiv = document.getElementById('order-summary');
    
    if (cartItems.length === 0) {
        summaryDiv.innerHTML = '<p>No items in cart. <a href="products.html">Continue Shopping</a></p>';
        return;
    }
    
    let total = 0;
    let html = '<div class="card p-3"><h5>Order Summary</h5><ul class="list-unstyled">';
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `<li class="d-flex justify-content-between">
            <span>${item.name} x${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        </li>`;
        total += itemTotal;
    });
    
    html += `</ul><hr><div class="d-flex justify-content-between"><strong>Total: $${total.toFixed(2)}</strong></div></div>`;
    summaryDiv.innerHTML = html;
}

function placeOrder() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const orderData = {
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        shippingAddress: document.getElementById('shippingAddress').value,
        items: cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending'
    };
    
    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(result => {
        alert(`Order placed successfully! Order ID: ${result.id}`);
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
    });
}
