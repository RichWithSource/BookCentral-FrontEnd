function addToCart(id) {
    const BACKEND_URL = "https://bookcentral-backend.onrender.com";

    fetch(`${BACKEND_URL}/api/products`)
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id === id);
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
            alert(`${product} added to cart`);
        })
        .catch(err => {
            console.error("Error adding to cart:", err);
            alert("Could not add to cart.");
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("product-container");

    fetch("https://bookcentral-backend.onrender.com")
        .then(res => res.json())
        .then(products => {
            renderProducts(products);
            setupCategoryFiltering(products);
        })
        .catch(error => {
            console.error("Failed to load products:", error);
            container.innerHTML = "<p>Could not load product data.</p>";
        });

    function renderProducts(productList) {
        container.innerHTML = "";
        productList.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
               <img src="${product.image}" alt="${product.name}">
               <h3>${product.name}</h3>
               <p>${product.description}</p>
               <p><strong>R${product.price.toFixed(2)}</strong></p>
               <button onclick="addToCart('${product.id}')">Add to Cart</button>
            `;
            container.appendChild(card);
        });
    }
/*
    function initTheme(){
        const toggle = document.getElementById('theme-toggle');

        function applyTheme(theme){
            document.body.classList.remove('light-theme', 'dark-theme');
            document.body.classList.add(`${theme}-theme`);
            localStorage.setItem('theme', theme);
            if(toggle) toggle.checked = theme === 'dark';

            const videoLight = document.getElementById('bg-video-light');
            const videoDark = document.getElementById('bg-video-dark');

            if(videoLight && videoDark) {
                if(theme === 'dark') {
                    videoLight.classList.add('hidden');
                    videoDark.classList.remove('hidden');
                }
                else {
                    videoDark.classList.add('hidden');
                    videoLight.classList.remove('hidden');
                }
            }
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if(toggle) {
        toggle.addEventListener('change', () => {
            applyTheme(toggle.checked ? 'dark' : 'light');
        });
    }
*/
    function setupCategoryFiltering(products) {
        document.querySelectorAll(".nav-menu a[data-catergory]").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            });
        });
    }
});