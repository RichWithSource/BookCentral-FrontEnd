function addToCart(id) {
    const BACKEND_URL = "https://bookcentral-backend.onrender.com";

    fetch(`${BACKEND_URL}/api/products4`)
        .then(res => res.json())
        .then(products4 => {
            const product = products4.find(p => p.id === id);
            if (!product) return alert("Product not found");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            }
            else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} added to cart`);
        })
        .catch(err => {
            console.error("Error adding to cart:", err);
            alert("Could not add to cart.");
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("product-container");

    fetch("https://bookcentral-backend.onrender.com/api/products4")
        .then(res => res.json())
        .then(products4 => {
            renderproducts4(products4);
            setupCategoryFiltering(products4);
        })
        .catch(error => {
            console.error("Failed to load products4:", error);
            container.innerHTML = "<p>Could not load product data.</p>";
        });

    function renderproducts4(productList) {
        container.innerHTML = "";
        productList.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
               <img src="${product.image}" alt="${product.name}">
               <h3>${product.name}</h3>
               <p>${product.description}</p>
               <p><strong>R${product.price.toFixed(2)}</strong></p>
               <button id="addCartButton" onclick="addToCart('${product.id}')">Add to Cart</button>
            `;
            container.appendChild(card);
        });
    }
    
    function setupCategoryFiltering(products4) {
        document.querySelectorAll(".nav-menu a[data-catergory]").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                const filtered = products4.filter(p => p.category === category);
                renderproducts4(filtered);
            });
        });
    }
});