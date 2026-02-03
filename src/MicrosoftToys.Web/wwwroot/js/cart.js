document.addEventListener('DOMContentLoaded', function() {
    // Placeholder: Load cart items from localStorage or API
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartDiv = document.getElementById('cart-items');
    const summaryDiv = document.getElementById('cart-summary');
    let total = 0;
    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card p-2';
        div.innerHTML = `<strong>${item.name}</strong> x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartDiv.appendChild(div);
        total += item.price * item.quantity;
    });
    summaryDiv.innerHTML = `<h5>Total: $${total.toFixed(2)}</h5>`;
});
