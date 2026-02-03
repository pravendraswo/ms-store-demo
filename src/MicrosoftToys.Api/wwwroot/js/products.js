document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

function loadProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const list = document.getElementById('product-list');
            list.innerHTML = '';
            products.forEach(product => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                const imageUrl = product.images && product.images.length > 0 
                    ? `/images/products/${product.images[0]}`
                    : '/images/products/placeholder.jpg';
                col.innerHTML = `
                    <div class="card mb-3">
                        <img src="${imageUrl}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                            <p class="card-text"><small class="text-muted">Category: ${product.category} | In Stock: ${product.inventory}</small></p>
                            <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                        </div>
                    </div>
                `;
                list.appendChild(col);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

function addToCart(productId, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId, name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}
