// Load cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("order-summary");
const totalElement = document.getElementById("order-total");

let total = 0;

// Show cart items
if (summary && totalElement) {

    if (cart.length === 0) {

        summary.innerHTML = `
            <p>Your cart is empty.</p>
        `;

    } else {

        cart.forEach(function(item) {

            const subtotal =
                item.price * item.quantity;

            total += subtotal;

            summary.innerHTML += `
                <div class="order-item">

                    <h3>${item.name}</h3>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        Price: ₹${item.price}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p>
                        Subtotal: ₹${subtotal}
                    </p>

                    <hr>

                </div>
            `;
        });
    }

    totalElement.innerText = total;
}

// Place Order Function
function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty.");
        return;
    }

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();

    const payment =
        document.getElementById("payment").value;

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

    // Create WhatsApp message
    let message =
        "🛍️ AKA Kurtis Order\n\n";

    cart.forEach(function(item) {

        message +=
            "Product: " + item.name +
            "\nSize: " + item.size +
            "\nQuantity: " + item.quantity +
            "\nPrice: ₹" + item.price +
            "\nSubtotal: ₹" +
            (item.price * item.quantity) +
            "\n\n";
    });

    message +=
        "Total: ₹" + total +

        "\n\nCustomer Details" +

        "\nName: " + name +

        "\nPhone: " + phone +

        "\nAddress: " + address +

        "\nCity: " + city +

        "\nPincode: " + pincode +

        "\nPayment Method: " + payment;

    // UPI Information
    if (payment === "UPI") {

        message +=
            "\n\nPlease make payment to UPI ID:" +
            "\n9510659255@oksbi";
    }

    const whatsappURL =
        "https://wa.me/919510659255?text=" +
        encodeURIComponent(message);

    // Open WhatsApp
window.location.href = whatsappURL;


}