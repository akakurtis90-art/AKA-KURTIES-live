// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart Function
function addToCart(name, price, sizeId) {

    const size = document.getElementById(sizeId).value;

    if (size === "") {
        alert("Please select a size.");
        return;
    }

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            size: size,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    alert("Added to Cart!");
}

// Update Cart Display
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

                <hr>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total;

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Increase Quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}

// Decrease Quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}

// Remove Item
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

// Search Products
function searchProducts() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(input)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }
    });
}

// Filter Products
function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

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

// Proceed to Checkout
function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");
        return;
    }

    window.location.href = "checkout.html";
}

// Load Cart on Page Load
updateCart();