document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/products.json')
        .then(response => response.json())
        .then(products => {
            const list = document.getElementById('product-list');
            products.forEach(product => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card">
                        <img src="../wwwroot/images/products/${product.images[0]}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                            <a href="product-detail.html?id=${product.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                `;
                list.appendChild(col);
            });
        });
});
