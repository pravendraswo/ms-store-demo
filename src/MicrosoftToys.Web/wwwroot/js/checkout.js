document.addEventListener('DOMContentLoaded', function() {
    // Placeholder: Show order summary from cart
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const summaryDiv = document.getElementById('order-summary');
    let total = 0;
    let html = '<h5>Order Summary</h5><ul>';
    cartItems.forEach(item => {
        html += `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`;
        total += item.price * item.quantity;
    });
    html += `</ul><strong>Total: $${total.toFixed(2)}</strong>`;
    summaryDiv.innerHTML = html;

    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Order placed! (Demo only)');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
});
