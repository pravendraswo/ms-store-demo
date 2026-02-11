document.addEventListener('DOMContentLoaded', function() {
    renderWishlist();
});

function renderWishlist() {
    const wishlist = getWishlist();
    const container = document.getElementById('wishlist-items');
    container.innerHTML = '';

    if (wishlist.length === 0) {
        container.innerHTML = '<p>Your wishlist is empty. <a href="products.html">Browse products</a></p>';
        return;
    }

    wishlist.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card p-3 mb-2';
        const imageUrl = item.image || '/images/products/placeholder.jpg';
        card.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${imageUrl}" alt="${item.name}" class="wishlist-thumb me-3">
                <div class="flex-grow-1">
                    <strong>${item.name}</strong><br>
                    <small class="text-muted">$${item.price.toFixed(2)}</small>
                </div>
                <div class="d-flex">
                    <button class="btn btn-sm btn-primary me-2" onclick="moveToCart(${item.productId})">Add to Cart</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${item.productId})">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    const summary = document.createElement('div');
    summary.className = 'card p-3 mt-3';
    summary.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>${wishlist.length} item(s) saved</div>
            <div>
                <a href="products.html" class="btn btn-outline-secondary btn-sm me-2">Keep Shopping</a>
                <button class="btn btn-outline-danger btn-sm" onclick="clearWishlist()">Clear Wishlist</button>
            </div>
        </div>
    `;
    container.appendChild(summary);
}

function moveToCart(productId) {
    const wishlist = getWishlist();
    const item = wishlist.find(entry => entry.productId === productId);
    if (!item) {
        return;
    }

    addItemToCart(item);
    const updatedWishlist = wishlist.filter(entry => entry.productId !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    renderWishlist();
    alert('Moved to cart!');
}

function addItemToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(entry => entry.productId === item.productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId: item.productId, name: item.name, price: item.price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromWishlist(productId) {
    const updatedWishlist = getWishlist().filter(item => item.productId !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    renderWishlist();
}

function clearWishlist() {
    localStorage.removeItem('wishlist');
    renderWishlist();
}

function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
}
