// Load cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("order-summary");
const totalElement = document.getElementById("order-total");

let total = 0;

// Show cart items
if (summary && totalElement) {

    if (cart.length === 0) {

        summary.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(function(item) {

            total += item.price * item.quantity;

            summary.innerHTML += `
                <div class="order-item">
                    <h4>${item.name}</h4>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: ₹${item.price * item.quantity}</p>
                </div>
            `;
        });
    }

    totalElement.innerText = total;
}

// Place Order Function
function placeOrder() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const payment = document.getElementById("payment").value;

    // Validation
    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {
        alert("Please fill all details.");
        return;
    }

    let message = "🛍️ AKA Kurtis Order\n\n";

    cart.forEach(function(item) {

        message +=
            item.name +
            " × " +
            item.quantity +
            " - ₹" +
            (item.price * item.quantity) +
            "\n";
    });

    message += "\nTotal: ₹" + total;
    message += "\n\nName: " + name;
    message += "\nPhone: " + phone;
    message += "\nAddress: " + address;
    message += "\nCity: " + city;
    message += "\nPincode: " + pincode;
    message += "\nPayment: " + payment;

    const whatsappURL =
        "https://wa.me/919510659255?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

    // Clear cart
    localStorage.removeItem("cart");

    alert("Order sent successfully!");

    // Redirect back to homepage
    window.location.href = "index.html";
}