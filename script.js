let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load cart when page opens
updateCart();

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " added to cart!");
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

                <button onclick="decreaseQty(${index})">−</button>

                <button onclick="increaseQty(${index})">+</button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total;
}

function increaseQty(index) {

    cart[index].quantity++;

    saveCart();
}

function decreaseQty(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
}

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

function goToCheckout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "checkout.html";
}
function searchProducts() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(input)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }

    });
}

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }

    });
}