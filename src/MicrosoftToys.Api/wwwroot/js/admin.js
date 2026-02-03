let currentEditingProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadOrders();
});

function loadProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const list = document.getElementById('product-list-admin');
            list.innerHTML = '';
            products.forEach(product => {
                const div = document.createElement('div');
                div.className = 'mb-3 p-3 border rounded';
                const imageUrl = product.images && product.images.length > 0 
                    ? `/images/products/${product.images[0]}`
                    : '/images/products/placeholder.jpg';
                div.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="${imageUrl}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px; border-radius: 8px;">
                            <div>
                                <strong>${product.name}</strong><br>
                                <small class="text-muted">$${product.price.toFixed(2)} - ${product.category} - Stock: ${product.inventory}</small>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-2" onclick="editProduct(${product.id})">Edit</button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">Delete</button>
                        </div>
                    </div>
                `;
                list.appendChild(div);
            });
        });
}

function loadOrders() {
    fetch('/api/orders')
        .then(response => response.json())
        .then(orders => {
            const list = document.getElementById('order-list-admin');
            list.innerHTML = '';
            orders.slice(0, 5).forEach(order => {
                const div = document.createElement('div');
                div.className = 'mb-2 p-2 border';
                div.innerHTML = `
                    <div>
                        <strong>Order #${order.id}</strong> - ${order.customerName}<br>
                        <small>Total: $${order.total.toFixed(2)} - Status: ${order.status}</small>
                    </div>
                `;
                list.appendChild(div);
            });
        });
}

function editProduct(id) {
    fetch(`/api/products/${id}`)
        .then(response => response.json())
        .then(product => {
            currentEditingProduct = product;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-inventory').value = product.inventory;
            
            const modal = new bootstrap.Modal(document.getElementById('productModal'));
            modal.show();
        });
}

function saveProduct() {
    const productData = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        category: document.getElementById('product-category').value,
        inventory: parseInt(document.getElementById('product-inventory').value),
        images: ['placeholder.jpg'],
        inStock: true
    };

    const isEditing = currentEditingProduct !== null;
    const url = isEditing ? `/api/products/${currentEditingProduct.id}` : '/api/products';
    const method = isEditing ? 'PUT' : 'POST';
    
    if (isEditing) {
        productData.id = currentEditingProduct.id;
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        modal.hide();
        loadProducts();
        clearForm();
        currentEditingProduct = null;
    })
    .catch(error => {
        console.error('Error saving product:', error);
        alert('Error saving product');
    });
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`/api/products/${id}`, { method: 'DELETE' })
            .then(() => loadProducts())
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Error deleting product');
            });
    }
}

function clearForm() {
    document.getElementById('product-form').reset();
}